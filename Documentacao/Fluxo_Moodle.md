# Análise Técnica do Fluxo: `Sincronizar Relatório do Moodle`

Esta seção detalha as principais etapas, condições e expressões utilizadas no fluxo de automação principal, servindo como um guia para manutenções e ajustes técnicos futuros.

---
## Etapa 1: Gatilho e Preparação do Arquivo

### Ação: Gatilho "Quando um novo e-mail chegar (V3)"
- **Descrição:** O fluxo é iniciado quando um e-mail com o assunto exato `Fluxo_Usuarios_Moodle` e contendo um anexo é recebido.
- **Lógica:**
    - `subjectFilter: "Fluxo_Usuarios_Moodle"`: Garante que apenas e-mails com este assunto acionem o fluxo.
    - `fetchOnlyWithAttachment: true`: Impede que e-mails sem anexo iniciem o processo.

### Ação: Loop `Aplicar a cada` (sobre os Anexos)
- **Descrição:** Um loop é iniciado para processar cada anexo do e-mail.
- **Ações Internas:**
    1.  **`Criar arquivo`:** O anexo do e-mail é salvo em uma pasta específica do OneDrive. O nome do arquivo é padronizado com a data e hora para garantir que seja único.
        - **Expressão (Nome do Arquivo):** `formatDateTime(triggerOutputs()?['body/receivedDateTime'], 'dd-MM-yyyy_HH-mm')`
    2.  **`Executar script`:** O fluxo chama o Office Script mestre, que realiza toda a limpeza, formatação e separação dos dados no arquivo Excel recém-salvo.

---
## Etapa 2: Sincronização de Entidades Únicas

O fluxo agora executa uma série de loops, cada um lendo uma das tabelas limpas e únicas que o script gerou.

### Loop 1: `For_Each_lotacao`
- **Fonte:** Lê a `TabelaLotacao` do Excel.
- **Lógica Principal:**
    - **`Obter itens`:** Para cada lotação, faz uma busca na `LST_Lotacoes`.
        - **Consulta de Filtro:** `Title eq '@{items('For_Each_lotacao')?['Lotacao']}'`
    - **`Condição`:** Verifica se a busca encontrou algum resultado.
        - **Expressão:** `length(outputs('Obter_itens_7')?['body/value'])` é igual a `0`
    - **`Criar item`:** Se a condição for verdadeira (nenhum item encontrado), cria a nova lotação.

### Loop 2: `For_Each_Usuarios`
- **Fonte:** Lê a `TabelaUsuarios` (com usuários únicos) do Excel.
- **Lógica Principal:**
    - **`Condição_4` (Verificação de E-mail):** Primeiro, verifica se o e-mail é do domínio da organização.
        - **Expressão:** `contains(items('For_Each_Usuarios')?['Email'], 'rs.gov.br')`
    - **`Obter perfil do usuário (V2)`:** Executada apenas se a condição acima for verdadeira. A ação seguinte é configurada para rodar mesmo que esta falhe, garantindo que e-mails externos não parem o fluxo.
    - **`Obter itens`:** Busca o usuário na `LST_Usuarios` pelo e-mail para ver se ele já existe.
        - **Consulta de Filtro:** `PK_Email eq '@{items('For_Each_Usuarios')?['Email']}'`
    - **`Condição` (Criar ou Atualizar):** Verifica se o usuário foi encontrado.
        - **Expressão:** `length(outputs('Obter_itens')?['body/value'])` é igual a `0`
    - **`Criar item` / `Atualizar item`:**
        - **`id` (para Atualizar):** `first(outputs('Obter_itens')?['body/value'])?['ID']` para identificar o registro a ser atualizado.
        - **`Lotacao/Id`:** `first(outputs('Buscar_ID_da_Lotacao_1')?['body/value'])?['ID']` para preencher o campo de Pesquisa (Lookup) com o ID correto.
        - **Campos do Teams:** Utiliza uma expressão `if()` para preencher os campos `Cargo_Teams` e `Lotacao_Teams` apenas se a busca de perfil foi bem-sucedida, inserindo `null` em caso de falha.
            ```
            if(not(empty(outputs('Obter_perfil_do_usuário_(V2)'))), outputs('Obter_perfil_do_usuário_(V2)')?['body/department'], null)
            ```

### Loop 3: `For_Each_Cursos`
- **Fonte:** Lê a `TabelaCursos` do Excel.
- **Lógica Principal:** Segue o mesmo padrão do loop de usuários (Obter itens -> Condição -> Criar/Atualizar).
    - **Consulta de Filtro:** `PK_ID_Curso eq @{items('For_Each_Cursos')?['ID_Curso']}` (sem aspas, pois é um campo de número).
    - **Conversão de Tipo:** Usa a expressão `int()` para converter os campos `ID_Curso` e `Carga_Horaria` (que vêm como texto do Excel) para o formato de número esperado pelo SharePoint.
        ```
        int(items('For_Each_Cursos')?['ID_Curso'])
        ```

---
## Etapa 3: Registro das Conclusões

### Loop 4: `For_Each_Conclusao`
- **Fonte:** Lê a `TabelaConclusao` do Excel.
- **Lógica Principal:**
    - **`Condição_5` (Validação de Linha):** Uma condição inicial verifica se a linha do Excel contém os dados mínimos necessários (ID do Curso e E-mail) antes de prosseguir.
    - **`Obter itens_2` e `Obter itens_3`:** Duas ações de busca para encontrar os `ID`s internos do Usuário e do Curso nas listas do SharePoint.
    - **`Obter itens_4` (Verificação de Vínculo):** Ação crucial que usa uma consulta de filtro composta para verificar se o vínculo de conclusão já existe.
        - **Consulta de Filtro:** `FK_UsuarioId eq @{...} and FK_Curso_IDId eq @{...}`
    - **`Condição_2`:** Verifica se o vínculo foi encontrado (`length(...)` é igual a `0`).
    - **`Criar item_2`:** Se o vínculo for novo, ele é criado.
        - **Campos de Pesquisa (Lookup):** Os campos `FK_Usuario/Id` e `FK_Curso_ID/Id` são preenchidos com os `ID`s encontrados nas buscas.
        - **`Data_Conclusao`:** Utiliza uma expressão `if()` robusta que lida com células vazias (inserindo `null`) e converte o número de série do Excel para um formato de data válido.
            ```
            if(empty(items('For_Each_Conclusao')?['DataConclusao']), null, addDays('1899-12-30', int(items('For_Each_Conclusao')?['DataConclusao']), 'yyyy-MM-dd'))
            ```
        - **`StatusAluno/Value`:** Usa uma expressão `if()` para definir o status como "Inscrito" ou "Concluído" com base na coluna "Concluido" do Excel.
            ```
            if(equals(items('For_Each_Conclusao')?['Concluido'], 'Sim'), 'Concluído', 'Inscrito')
            ```

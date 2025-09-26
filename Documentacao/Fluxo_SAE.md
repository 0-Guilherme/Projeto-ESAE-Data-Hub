# Análise Técnica do Fluxo: `Sincronizar Lista de Usuários SAE`

Esta seção detalha as principais etapas, condições e expressões utilizadas no fluxo de automação para a lista de usuários SAE, servindo como um guia para manutenções e ajustes técnicos futuros.

---
## Etapa 1: Gatilho e Preparação do Arquivo

### Ação: Gatilho "Disparar um fluxo manualmente"
- **Descrição:** O fluxo é iniciado manualmente por um administrador. Esta abordagem foi escolhida para dar controle total sobre quando e qual lista de origem é processada.
- **Lógica e Entradas:** O gatilho foi configurado com duas entradas obrigatórias:
    1.  **`ArquivoExcelSAE` (do tipo Arquivo):** Permite ao administrador carregar o relatório Excel a ser processado.
    2.  **`OrigemDados` (do tipo Texto):** O administrador deve inserir o identificador exato da fonte de dados (ex: "CGAJAPDI-Servidores"). Este valor é crucial para a lógica de inativação e para "carimbar" os registros no SharePoint.

### Ação: "Executar script"
- **Descrição:** A primeira ação do fluxo. Ela chama o Office Script (`PA-SAE-CGAJAPDI-Servidores`) para realizar a limpeza e formatação completa do arquivo Excel fornecido no gatilho.

---
## Etapa 2: Inativação Preventiva em Lote

O fluxo adota uma lógica de "inativação preventiva" para garantir que a lista do SharePoint seja sempre um espelho fiel do último relatório recebido para uma determinada origem.

### Ação: "Obter Usuários Ativos da Origem"
- **Descrição:** Antes de processar os novos dados, o fluxo busca no SharePoint todos os usuários que pertencem à `OrigemDados` que está sendo sincronizada e que estão atualmente com o status "Ativo".
- **Consulta de Filtro:**
    ```
    Status eq 'Ativo' and OrigemDados eq '@{triggerBody()['text']}'
    ```

### Ação: Loop "Aplicar a cada" (Inativação)
- **Descrição:** Um loop percorre a lista de usuários encontrada na etapa anterior.
- **Ação Interna:** Dentro do loop, uma única ação **`Atualizar item`** define o campo `Status` de cada um desses usuários para **`Inativo`**.

---
## Etapa 3: Sincronização Principal (Criar ou Reativar/Atualizar)

Após a inativação, o fluxo inicia o processo de sincronização com base no arquivo Excel já limpo.

### Ação: Loop "Aplicar a cada" (Sincronização Principal)
- **Fonte:** Lê a tabela final e limpa do arquivo Excel.
- **Lógica Principal:** Para cada linha do Excel, o fluxo executa uma lógica de verificação em cascata para máxima robustez, lidando inclusive com registros que possam vir sem e-mail.

#### Lógica de Verificação (Dentro do Loop):

1.  **`Verificar se Usuário SAE Existe`:** A primeira ação é uma busca (`Obter itens`) na `LST_Usuarios_SAE` usando o `Email_SAE` como chave.

2.  **`Condição` (Principal - baseada no E-mail):**
    - **Descrição:** A condição principal do loop, configurada com a lógica **"OU"**.
    - **Expressão:** A condição é **verdadeira** (e o fluxo entra no caminho "Se sim") se uma das duas regras for atendida:
        1.  A busca por e-mail **não encontrou** nenhum usuário: `length(outputs('Verificar_se_Usuário_SAE_Existe')?['body/value'])` é igual a `0`
        2.  **OU** a célula de e-mail no Excel estava **vazia**: `empty(items('For_each_Verificar_e_Atualizar')?['Email_SAE'])` é igual a `true`

3.  **Caminho "Se sim" (E-mail não encontrado ou vazio - Lógica de Fallback):**
    - **`Verificar_por_Nome`:** O fluxo executa uma segunda busca (`Obter itens`), desta vez usando o `NomeCompletoSAE`.
    - **`Condição_1` (Aninhada):** Verifica se a busca por nome encontrou um registro.
        - **Se SIM:** Executa a ação **`Atualizar_item_1`**, usando o `ID` encontrado pela busca de nome.
        - **Se NÃO:** Executa a ação **`Criar_item`**, pois agora temos certeza de que o usuário é novo.

4.  **Caminho "Se não" (E-mail foi encontrado):**
    - Executa a ação **`Atualizar_item`**, usando o `ID` encontrado pela busca principal por e-mail para garantir a atualização do registro correto.

#### Expressões Chave:
- **`utcNow()`:** Utilizada nos campos `DataUltimaVerificacao` das ações "Criar item" e "Atualizar item" para registrar a data e hora exatas da sincronização.
- **`first(outputs('...')?['body/value'])?['ID']`:** Utilizada para extrair o `ID` do item encontrado pela ação "Obter itens" para ser usado no campo `Id` da ação "Atualizar item".

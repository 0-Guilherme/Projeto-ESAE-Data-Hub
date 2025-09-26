# Análise Técnica do Fluxo: `Sincronizar Lista de Usuários SAE (CGAJAPDI)`

Esta seção detalha as principais etapas, condições e expressões utilizadas no fluxo de automação para a lista de usuários SAE, servindo como um guia para manutenções e ajustes técnicos futuros.

---
## Etapa 1: Gatilho e Preparação do Arquivo

### Ação: Gatilho "Quando um novo e-mail chegar (V3)"
- **Descrição:** O fluxo é iniciado quando um e-mail com o assunto exato `Fluxo_Atualizar_SAE` e contendo um anexo é recebido.
- **Lógica:**
    - `subjectFilter: "Fluxo_Atualizar_SAE"`: Garante que apenas e-mails com este assunto acionem o fluxo.
    - `fetchOnlyWithAttachment: true`: Impede que e-mails sem anexo iniciem o processo.

### Ação: Loop `Aplicar a cada` (sobre os Anexos)
- **Descrição:** Um loop é iniciado para processar cada anexo do e-mail.
- **Ações Internas:**
    1.  **`Criar arquivo`:** O anexo do e-mail é salvo na pasta `/RELATÓRIOS/` do OneDrive. O nome do arquivo é padronizado com a data e hora para garantir que seja único.
        - **Expressão (Nome do Arquivo):** `formatDateTime(triggerOutputs()?['body/receivedDateTime'], 'dd-MM-yyyy_HH-mm')`
    2.  **`Executar script`:** Esta é a etapa de transformação (ETL). O fluxo chama o Office Script `PA-SAE-CGAJAPDI-Servidores`, que realiza toda a limpeza, formatação e validação dos dados no arquivo Excel recém-salvo.

---
## Etapa 2: Inativação Preventiva em Lote

O fluxo adota uma lógica de "inativação preventiva" para garantir que a lista do SharePoint seja sempre um espelho fiel do último relatório recebido para uma determinada origem.

### Ação: "Obter Dados de Servidores"
- **Descrição:** Antes de processar os novos dados, o fluxo busca no SharePoint todos os usuários que pertencem à `OrigemDados` que está sendo sincronizada (neste caso, `CGAJAPDI-Servidores`) e que estão atualmente com o status "Ativo".
- **Consulta de Filtro:**
    ```
    Satus eq 'Ativo' and OrigemDados eq 'CGAJAPDI-Servidores'
    ```

### Ação: Loop `For_Each_Inativar`
- **Descrição:** Um loop percorre a lista de usuários encontrada na etapa anterior.
- **Ação Interna:** Dentro do loop, uma única ação **`Atualizar item`** (`Inativar`) define o campo `Satus` de cada um desses usuários para **`Inativo`**.

---
## Etapa 3: Sincronização Principal (Criar ou Reativar/Atualizar)

Após a inativação, o fluxo inicia o processo de sincronização com base no arquivo Excel já limpo.

### Ação: Loop `For_each_Verificar_e_Atualizar`
- **Fonte:** Lê a tabela final e limpa (`TabelaServidoresSAE`) do arquivo Excel.
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
- **`first(outputs('...')?['body/value'])?['ID']`:** Utilizada para extrair o `ID` do item encontrado pela ação "Obter itens" para ser usado no campo `id` da ação "Atualizar item".

# Análise Técnica do Fluxo: `Sincronizar Lista de Usuários SAE`

Esta seção detalha as principais etapas, condições e expressões utilizadas no fluxo de automação para a lista de usuários SAE, servindo como um guia para manutenções e ajustes técnicos futuros.

---
## Etapa 1: Gatilho e Preparação de Dados

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

1.  **`Condição: Verificar se Email está Vazio`**
    - **Descrição:** A primeira verificação do loop.
    - **Expressão:** `empty(items('Aplicar_a_cada')?['Email_SAE'])` é igual a `true`
    - **Resultado:** A lógica se divide em dois caminhos principais.

2.  **Caminho "Se sim" (E-mail está VAZIO):**
    - O fluxo executa uma busca **apenas pelo Nome Completo**.
    - Uma condição aninhada verifica se a busca por nome encontrou um registro. Se sim, **`Atualiza o item`** encontrado; se não, **`Cria um novo item`**.

3.  **Caminho "Se não" (E-mail está PREENCHIDO):**
    - O fluxo segue o caminho principal e mais seguro.
    - **`Verificar se Usuário SAE Existe`:** Uma ação `Obter itens` busca o usuário na `LST_Usuarios_SAE` usando o `Email_SAE` como chave.
    - **`Condição` Aninhada:** Verifica se a busca por e-mail encontrou um registro.
        - **Se NÃO for encontrado:** Executa a ação **`Criar item`**, preenchendo todos os campos com os dados do Excel e definindo o `Status` como **`Ativo`**.
        - **Se FOR encontrado:** Executa a ação **`Atualizar item`**, atualizando todas as informações e, crucialmente, mudando o `Status` de volta para **`Ativo`**.

#### Expressões Chave:
- **`utcNow()`:** Utilizada nos campos `DataUltimaSincronizacao` das ações "Criar item" e "Atualizar item" para registrar a data e hora exatas da sincronização.
- **`first(outputs(...)`:** Utilizada para extrair o `ID` do item encontrado pela ação "Obter itens" para ser usado no campo `Id` da ação "Atualizar item".

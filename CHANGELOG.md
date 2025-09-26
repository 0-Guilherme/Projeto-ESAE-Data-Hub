# CHANGELOG - Histórico de Alterações

Todos as mudanças notáveis neste projeto estão documentadas neste arquivo, está ligada ao versionamento do power apps em que aglomero as alterações em alguns

---

## Índice
1. [Planejamento para Novas Versões](#planejamento-para-próximas-versões)
2. [Work in Progress](#work-in-progress)
3. [Versão 202](#202---2025-09-12)
4. [Versão 147](#147---2025-09-05)
5. [Versão 109](#109---2025-08-04)
6. [Versão 068](#068---2025-07-31)
7. [Versão 037](#037---2025-07-09)
8. [Versão 010](#010---2025-06-27)
9. [Versão Conceitual - 2025-01-01](#Versão-Conceitual---2025-01-01)

---
# Planejamento para Novas Versões

Este documento descreve o roteiro de desenvolvimento para futuras versões do sistema, focando em agregar valor, robustez e novas funcionalidades à base já construída.

### 🆕 Adicionado
- [ ] **Ferramenta de Mesclagem de Lotações:** Nova tela no Power App e fluxo associado para permitir que administradores corrijam e unifiquem registros de lotações duplicados.
- [ ] **Filtros Adicionais na Tela de Conclusões:** Implementar novos filtros na `TelaConclusoesRecentes` (ex: "Este Mês", "Últimos 7 dias") para facilitar a análise dos gestores.
- [ ] **Botão de Acesso ao Power BI:** Adicionar um botão na `tela_inicial` para abrir o relatório completo no Power BI (`Launch()` function).
- [ ] **Manual do Usuário:** Criar um guia inicial para os usuários entenderem como as bases de dados e o sistema funcionam.

### ✅ Melhorado
- [ ] **Interface Gráfica Responsiva:** Refatorar as telas restantes do Power App utilizando Contêineres de Layout para garantir a adaptabilidade a dispositivos móveis em modo vertical.
- [ ] **Tratamento de Erros Avançado:** Implementar um sistema de notificação por e-mail no Power Automate para alertar administradores sobre falhas na execução dos fluxos.
- [ ] **Otimizar Fluxo de Ingestão de Usuários:** Continuar a otimização do fluxo, com foco em reduzir a redundância e o número de chamadas para garantir que não exceda os limites diários da plataforma.
- [ ] **Conexão Direta do Power BI:** Adequar as bases de dados dos dashboards do Power BI para se conectarem diretamente às listas do SharePoint.

### 🆕 Novo
- [ ] **Fluxo de Ingestão AJS-NS:** Desenvolver um novo fluxo de trabalho para processar a lista de AJS-NS, que é recebida em um formato diferente (apenas nomes). O fluxo precisará buscar e validar os e-mails no Microsoft 365.
- [ ] **Fluxo de Ingestão Coordenadores Setoriais:** Desenvolver um novo fluxo de trabalho para processar a lista de Coordenadores das Setoriais.

---
## Work in Progress

**Notas para a nova versão - Versão atual: 204**
- necessario incluir um botão para levar ao BI completo, ja temos o comando e as telas prontas.
- adequar as bases de dados dos dashboard do powerbi para conectar direto ao sharepoint.
- aplicar esta mesma lógica para a listagem dos cursos concluidos por cada aluno na tela_detalhes_usuarios - em processo.
- rodar novamente a ingestao de dados para atualização das colunas, primeira ingestão é de 01/08/2025-22/09/2025.
- necessário descrever fora do script o trabalho realizado no fluxo CGAJAPDI, que por si só deveria ser um sistema a parte.
- criar um manual inicial para os usuários entenderem como que as data bases e seus dados funcionam.
- agendamento do moodle, ainda é um gatilho manual, devido a considerações de quais dados estaremos rodando no momento, devido ao imenso volume que estamos tratando por rotina, após normalização, configurar para rodar a cada dia às 6h.,

---
## [202] - 2025-09-12

### 🆕 Adicionado
- **Gráficos no Dashboard:** Inclusão de elementos visuais de BI na tela principal para análise de dados (`Gráfico de Colunas` para Top Cursos, `Gráfico de Pizza` para distribuição de usuários).
- **Fluxo "Auditor" de Consistência de Dados:** Criado um novo fluxo agendado no Power Automate dedicado a auditar a consistência entre as listas `LST_Usuarios` e `LST_Usuarios_SAE`.
    - O fluxo percorre todos os registros da `LST_Usuarios`.
    - Para cada registro, ele cruza a informação com a `LST_Usuarios_SAE` (usando o e-mail como chave).
    - Ele aplica um conjunto de regras de negócio para identificar inconsistências (ex: um usuário marcado como "SAE Sim" na lista principal, mas que está "Inativo" ou não existe na lista SAE).
    - Quando uma inconsistência é encontrada, o fluxo atualiza uma coluna de status (ex: `ValidarSAE`) para um valor de alerta (ex: "AdicionarSAE", "RemoverSAE"), sinalizando a necessidade de revisão manual.
- **Tela de Auditoria no Power App (`TelaAuditoria`):**
    - Criada uma nova tela no aplicativo que exibe uma galeria com os usuários que precisam de atenção.
    - A galeria é filtrada para mostrar apenas os usuários cuja coluna `ValidarSAE` (ou similar) tenha um status diferente de "Normal".
    - A tela inclui filtros para que o administrador possa focar em ações específicas ("AdicionarSAE", "RemoverSAE").
    - Cada item na galeria é clicável e navega para a tela de detalhes/reconciliação (`TelaDetalhesUsuarioSAE`), fornecendo um atalho direto para a resolução do problema.
 
### 🛠️ Corrigido
- Lista de Categorias não estava sendo adicionada corretamente, corrigido fluxo no power automate e também o script do office para as ccorreções surtirem efeito.
- Datas de concluões dos cursos e dos ususarios não estavam corretas, corrigido de maneira a mostrar a data formatada, configurada e também adicionando o "statusaluno' para inscrito ou concluido na coluna Status.
- Alterações e optimizações para o fluxo LST-Usuarios (agora 20% mais rápido), verifica se o usuario esta com um email possivel de procurar no outlook, como final rs.gov.br. Também verifica se o ID do curso está preenchido, se não ignora.

### 🔧 Alterado
- Repositório do GitHub atualizado para incluir todas as imagens e scripts do sistema. (não incluso backups dos fluxos)

---
## [147] - 2025-09-05

### 🔧 Alterado
- Otimizado o `Fluxo_Usuarios-v2` em aproximadamente 30% do tempo de processamento. (Para envio de e-mails, utilizar o assunto `"Fluxo_Usuarios_Moodle"`).
- O `Script_Usuarios-v2` foi reorganizado para gerar tabelas com nomes únicos, reduzindo o tempo de execução em loops.
- A `tela_inicial` do Power App foi refatorada com contêineres flexíveis, tornando-a compatível com múltiplas resoluções, inclusive celulares.
- A propriedade `OnVisible` das telas `tela_detalhes_cursos` e `tela_detalhes_usuarios` agora utiliza coleções para exibir as listas de alunos/cursos, melhorando drasticamente a performance e a escalabilidade.
- Atualização completa da documentação do projeto (`README.md`, `CHANGELOG.md`).

### 🆕 Adicionado
- O `Fluxo_SAE-CGAJAPDI-Servidores-v2` agora gera uma planilha Excel separada com o log de novos usuários adicionados.
- A lista `LST_Usuarios` agora possui a coluna `Data da Última Modificação` para melhor rastreabilidade.
- O `Fluxo_SAE-CGAJAPDI-Servidores-v2` está apto a rodar integralmente na nuvem. (Para ativação, enviar e-mail com o assunto `"Fluxo_Atualizar_SAE"`). Seu tempo de processamento foi reduzido em aproximadametne 20%.
- O `Script_SAE-CGAJAPDI-Servidores-v4.0.0` foi finalizado e validado.
- **`Fluxo de Ingestão do Moodle` agora calcula e atualiza a contagem de alunos (`QtdAlunos`) em cada curso.** *(Ajuste de clareza: A contagem é feita pelo fluxo de ingestão, enquanto o Fluxo Auditor verifica inconsistências).*
- A tela `tela_dashboard_bi` foi criada com:
  - Gráfico em formato de galeria horizontal exibindo o total de alunos inscritos por curso.
  - Três menus suspensos para seleção de Categoria, Semestre e Status (Inscrição/Conclusão).
  - Navegação para os detalhes do curso habilitada ao clicar no item do gráfico.
- Adicionadas as colunas auxiliares `FK_Curso_in_Text` e `FK_Usuario_in_Text` à lista `LST_Usuarios-Cursos`, preenchidas via Power Automate. Isso permite filtros delegáveis no Power Apps e supera o limite de 2.000 registros.
- O fluxo de criação de conclusões foi ajustado para preencher automaticamente os campos `FK_Curso_in_Text` e `FK_Usuario_in_Text`.

### 🛠️ Corrigido
- Ajustada a lógica de carregamento de dados com `ClearCollect` e `OnVisible` para resolver falhas de delegação com listas acima de 2.000 registros.
- Corrigida a navegação entre as telas de cursos e usuários, garantindo a passagem correta do contexto (`gblCursoSelecionado`, `gblUsuarioSelecionado`) e a exibição completa dos dados vinculados.

---
## [109] - 2025-08-04

### 🆕 Adicionado
- **Módulo de Gestão de Usuários SAE:** Criada a lista `LST_Usuarios_SAE` para servir como "fonte da verdade" para usuários externos.
- **Fluxo de Sincronização SAE:** Criado um novo fluxo no Power Automate para sincronizar a lista `LST_Usuarios_SAE` a partir de um arquivo Excel, incluindo lógica de inativação de usuários removidos.
- **Telas de Reconciliação no Power App:** Criadas as telas `TelaGerenciarUsuariosSAE` (com filtros) e `TelaDetalhesUsuarioSAE` (para comparação lado a lado dos dados SAE vs. Moodle).
- **Pré-processamento com Office Scripts:** Criado um script mestre para limpar e formatar os relatórios do Excel (SAE e Moodle) antes da ingestão de dados.

### 🔧 Alterado
- **Escopo do Power App:** O aplicativo foi redefinido como uma ferramenta de **visualização e consulta** para os dados do Moodle.
- **Fluxo Principal do Moodle:** A lógica de preenchimento do campo `Usuario_SAE` foi alterada para consultar a lista `LST_Usuarios_SAE`.

### ❌ Removido
- **Funcionalidade de Edição/Criação:** As telas e botões para criar/editar/excluir usuários e cursos das listas principais foram removidos.

### 🛠️ Corrigido
- **Filtros Complexos não Delegáveis:** Otimizadas as fórmulas de filtro em várias telas (como `TelaAuditoria`) para serem delegáveis ao SharePoint, utilizando `SortByColumns` e reestruturando a lógica para resolver problemas de performance e os limites de delegação de dados.
- Múltiplos erros de conversão de tipo de dado (Datas, Números, Booleanos) no Power Automate.

---
## [068] - 2025-07-31

### 🆕 Adicionado
- **Fluxo de Ingestão de Dados (Power Automate):** Criado o fluxo principal acionado por arquivo no OneDrive para sincronizar os dados do Moodle com o SharePoint.
- **Lógica de Sincronização Otimizada:** Implementado o padrão de "Selecionar" e "Compor" (`union`) para processar apenas usuários e cursos únicos, melhorando a performance.
- **Lógica de "Check-then-Create/Update":** O fluxo agora verifica se um registro já existe antes de criá-lo, para evitar duplicatas.
- **Contagem Automática de Alunos:** Adicionada uma etapa ao final do fluxo de ingestão que calcula e atualiza a coluna `QtdAlunos`.
- **Tela de "Conclusões Recentes":** Criada tela no Power App para exibir conclusões dos últimos meses, com filtros de data dinâmicos.

### 🛠️ Corrigido
- **Problemas de Delegação:** Otimizadas as fórmulas das galerias nas telas de detalhes com `SortByColumns` para resolver problemas de lentidão com mais de 2000 itens.
- **Erros de Tipo de Dado:** Resolvidos múltiplos erros de conversão de dados (Datas, Números, Booleanos) no Power Automate.

---
## [052] - 2025-07-14

### 🆕 Adicionado
- Funcionalidade completa de CRUD para Usuários e Cursos no Power App para manter o controle dos dados nas etapas iniciais de desenvolvimento.
- Telas de formulário (`TelaEditarUsuario`, `TelaNovoUsuario`, etc.) utilizando o controle `Formulário de Edição`.
- Lógica de `NewForm()` e `ResetForm()` para gerenciamento do estado dos formulários.
- Implementado pop-up de confirmação para a ação de excluir.

---
## [037] - 2025-07-09

### 🆕 Adicionado
- **Power App (Interface de Leitura):**
    - `TelaInicial` com indicadores de contagem (`CountRows()`) e navegação principal.
    - `TelaUsuarios` e `TelaCursos` com galerias e caixas de busca.
    - Estruturação das galerias e rótulos iniciais da `TelaDetalhesUsuario` e `TelaDetalhesCurso` para visualização 360°, incluindo sub-galerias para dados relacionados.

---
## [010] - 2025-06-27

### 🆕 Adicionado
- **Base de Dados:** Criadas as 4 listas iniciais no SharePoint (`LST_Usuarios`, `LST_Cursos`, `LST_Lotacoes`, `LST_Usuarios-Cursos`).
- **Power App (Interface de Leitura):**
    - Definição de cada telas e layouts básicos: `TelaInicial`, `TelaUsuarios`, `TelaCursos`, `TelaDetalhesUsuario` e `TelaDetalhesCurso`

---
## Versão Conceitual - 2025-01-01
- Power Automate: Relatorios_ESAE_Teste
- Recebe Relatorio do Moodle: Automatico_ID=1 =2 =3 e envia para o e-mail relacionado
- Scripts Utilizados - Relatorio_ESAE_Testes - Criar_Tabela_1 // Mudar_Datas // Criar_Tabelas_Dinamicas
- ID = 1 Rodando normalmente a cada semana. ID = 2 e 3 Pausados, rodando sob solicitação do Rodrigo


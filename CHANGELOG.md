# CHANGELOG - Histórico de Alterações

Este documento registra todas as mudanças relevantes realizadas no projeto, organizadas por versão e data. As alterações estão agrupadas conforme o versionamento aplicado ao Power Apps e aos fluxos do Power Automate, refletindo melhorias incrementais, correções, novos recursos e ajustes estruturais.

Cada versão representa um conjunto de entregas que podem envolver múltiplos componentes do sistema, como telas do aplicativo, listas do SharePoint, fluxos automatizados, scripts de pré-processamento e integrações com Power BI. O objetivo é garantir rastreabilidade, facilitar auditorias técnicas e apoiar a evolução contínua da solução.

Os históricos de alterações relacionados aos scripts, estão disponíveis na pasta abaixo:

  * ➡️ [.Documentacao/Scripts](https://github.com/0-Guilherme/Projeto-ESAE-Data-Hub/tree/main/Documentacao/Scripts)

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

### 🆕 Adicionar
- [ ] **Ferramenta de Mesclagem de Lotações:** Nova tela no Power App e fluxo associado para permitir que administradores corrijam e unifiquem registros de lotações duplicados.
- [ ] **Filtros Adicionais na Tela de Conclusões:** Implementar novos filtros na `TelaConclusoesRecentes` dentro do Power Apps (ex: "Este Mês", "Últimos 7 dias") para facilitar a análise dos gestores.
- [ ] **Manual do Usuário:** Criar um guia inicial para os usuários entenderem como as bases de dados e o sistema como um todo funciona.
- [ ] **Fluxo de Ingestão AJS-NS:** Desenvolver um novo fluxo de trabalho para processar a lista de AJS-NS, que é recebida em um formato diferente (apenas nomes). O fluxo precisará buscar e validar os e-mails no Microsoft 365.
- [ ] **Fluxo de Ingestão Coordenadores Setoriais:** Desenvolver um novo fluxo de trabalho para processar a lista de Coordenadores das Setoriais.


### ✅ Melhorar
- [ ] **Interface Gráfica Responsiva:** Refatorar as telas restantes do Power App utilizando Contêineres de Layout para garantir a adaptabilidade a dispositivos móveis em modo vertical.
- [ ] **Tratamento de Erros Avançado:** Implementar um sistema de notificação por e-mail no Power Automate para alertar administradores sobre falhas na execução dos fluxos.
- [ ] **Otimizar Fluxo de Ingestão de Usuários:** Continuar a otimização do fluxo, com foco em reduzir a redundância e o número de chamadas.

### 📌 Notas
- [ ] planejar como será atendida as demandas e cálculos de cursos externos à plataforma moodle (forms, fluxo, ...)
- [ ] pensar em como concatenar ou definir as lotações, uma vez que não temos uma padronização dos nomes.


---


## [Não Lançado]

### 📝 Em Andamento (WIP) -
## [Não Lançado] - Planejamento para Próximas Versões

Esta seção descreve o roteiro de desenvolvimento (roadmap) para a próxima versão, incluindo suas novas funcionalidades e correções.

#### Incluir Novas Funcionalidades

- [ ] **Ferramenta de Mesclagem de Lotações:**
    - **Objetivo:** Construir uma nova tela no Power App e um fluxo de suporte no Power Automate. A ferramenta permitirá que um administrador selecione múltiplas lotações com nomes inconsistentes (ex: "PGE-GAB", "Gabinete") e uma lotação "correta", unificando todos os usuários sob o registro correto.
    - **Valor:** Garante a integridade dos dados e a precisão das análises por departamento no Power BI.

- [ ] **Fluxo de Ingestão (AJS-NS e Coordenadores):**
    - **Objetivo:** Desenvolver novos fluxos de trabalho no Power Automate para processar estas listas, que são recebidas em formatos diferentes (muitas vezes, apenas com nomes). O fluxo precisará buscar e validar os e-mails no Microsoft 365.
    - **Valor:** Automatiza a ingestão de novas fontes de dados SAE, eliminando o trabalho manual e expandindo o alcance do sistema.

#### Melhorias de Robustez e Usabilidade

- [ ] **Tratamento de Erros Avançado:**
    - **Objetivo:** Implementar um sistema de notificação por e-mail nos fluxos do Power Automate.
    - **Valor:** Alerta os administradores proativamente sobre falhas na execução dos fluxos, aumentando a confiabilidade do sistema e permitindo uma resolução de problemas mais rápida.
- [ ] **Interface Gráfica Responsiva:**
    - **Objetivo:** Continuar o trabalho de refatoração das telas restantes do Power App (como as telas de detalhes e de gestão) utilizando Contêineres de Layout.
    - **Valor:** Garante que o aplicativo tenha uma experiência de usuário funcional e profissional em dispositivos móveis.
- [ ] **Filtros Adicionais na Tela de Conclusões:**
    - **Objetivo:** Adicionar mais opções de filtro pré-definidas (ex: "Este Mês", "Últimos 7 dias") na `TelaConclusoesRecentes`.
    - **Valor:** Aumenta o poder de análise da tela de relatórios, facilitando o trabalho dos gestores.


```
### 🆕 Adicionado
-

### 🛠️ Corrigido
- [X] 06/10/25 Agendamento rodando diariamente: 02h para inscrições e 03h para conclusões

### 📌 Notas
- 
```

---

## [205] - 2025-10-03

**Todas as tarefas para a próxima versão já foram atendidas! Documentação  em verificação e Deploy na próxima Semana!!!!!**

Esta versão representa um marco significativo no projeto, com a conclusão de toda a documentação da arquitetura, a finalização da segunda versão do dashboard de BI no Power BI e a implementação de correções críticas nos fluxos de automação.

### 🆕 Adicionado

- **Documentação Abrangente do Projeto:**
    - **Arquitetura de Dados:** Criada a documentação detalhada para cada lista do SharePoint, explicando o propósito de cada coluna e a lógica de normalização de dados (1FN, 2FN, 3FN).
    - **Análise Técnica dos Fluxos:** Desenvolvida a documentação para cada um dos fluxos principais do Power Automate (`Sincronizar Moodle`, `Sincronizar SAE`, `Auditor`), detalhando cada etapa, lógica de condição e expressões utilizadas.
    - **Manual do Usuário:** Criado o primeiro manual de operações, orientando os administradores sobre como executar os fluxos de sincronização e utilizar as ferramentas do sistema.
- **Desenvolvimento e Integração do Dashboard de BI (Power BI):**
    - **Modelo Semântico Robusto:** Construído um novo modelo semântico no Power BI, conectando-se diretamente às listas do SharePoint.
    - **Medidas DAX Avançadas:** Implementadas múltiplas medidas DAX para análises de performance, incluindo `Total de Inscrições`, `Total de Conclusões`, `Total de Horas Concluídas`, `Contagem de Alunos Únicos` e `Taxa de Conclusão`.
    - **Análise Temporal:** Criada uma tabela de calendário (`dCalendario`) com colunas calculadas para permitir análises por Ano, Semestre e Quadrimestre.
    - **Interatividade:** O dashboard agora inclui navegação por marcadores (`bookmarks`) e um título dinâmico que reflete o período selecionado.
- **Integração Power Apps ↔ Power BI:**
    - Adicionado um botão na tela principal do Power App que utiliza a função `Launch()` para abrir o relatório completo do Power BI em uma nova aba do navegador, integrando as duas plataformas.

### 🔧 Alterado

- **Estrutura do Repositório (GitHub):** A documentação, que antes estava centralizada em um único arquivo, foi distribuída em múltiplos arquivos `.md` (`README.md`, `CHANGELOG.md`, `TELAS.md`, `ARQUITETURA.md`), seguindo as melhores práticas de gerenciamento de projetos.

### 🛠️ Corrigido

- **Processamento de Datas nos Fluxos:** Corrigida a lógica de ingestão de datas de conclusão no Power Automate. A fórmula agora utiliza uma expressão `if/addDays` robusta, que lida com células vazias e converte corretamente as datas que vêm do Excel no formato de "número de série", eliminando os erros de `ParameterTypeConversionFailed`.

---
## [202] - 2025-09-12

### 🆕 Adicionado
- **Gráficos no Dashboard:** Inclusão de gráfico simplificado no Aplicativo, no formato de linhas para análise de cursos e distribuição de usuários.
- **Fluxo "Auditor" de Consistência de Dados:** Verifica divergências entre `LST_Usuarios` e `LST_Usuarios_SAE`, atualizando a coluna `ValidarSAE` com alertas como "AdicionarSAE" ou "RemoverSAE".
- **TelaAuditoria no Power App:** Exibe usuários com inconsistências, com filtros e navegação para `TelaDetalhesUsuarioSAE`.
  
### 🛠️ Corrigido
- Correção na adição da lista de categorias (fluxo e script ajustados).
- Datas de conclusão corrigidas e formatadas; campo `StatusAluno` agora mostra "Inscrito" ou "Concluído".
- Otimizações no fluxo `LST_Usuarios`: 20% mais rápido, valida domínio de e-mail e presença de ID do curso.
  
### 🔧 Alterado
- Repositório GitHub atualizado com imagens e scripts (sem incluir backups dos fluxos).
  
---
## [147] - 2025-09-05

### 🆕 Adicionado
- `Fluxo_SAE-CGAJAPDI-Servidores-v2` agora gera planilha com log de novos usuários.
- Coluna `Data da Última Modificação` adicionada à lista `LST_Usuarios`.
- `Fluxo_SAE-CGAJAPDI-Servidores-v2` otimizado para rodar na nuvem (20% mais rápido).
- Finalização do `Script_SAE-CGAJAPDI-Servidores-v4.0.0`.
- `Fluxo de Ingestão do Moodle` atualiza contagem de alunos (`QtdAlunos`) por curso.
- Criação da tela `tela_dashboard_bi` com gráficos e filtros interativos.
- Colunas `FK_Curso_in_Text` e `FK_Usuario_in_Text` adicionadas à lista `LST_Usuarios-Cursos` para filtros delegáveis.
- Fluxo de criação de conclusões ajustado para preencher automaticamente os campos de texto vinculados.

### 🛠️ Corrigido
- Ajustes em `ClearCollect` e `OnVisible` para resolver falhas de delegação.
- Correção na navegação entre telas, garantindo passagem de contexto e exibição completa dos dados.

### 🔧 Alterado
- Otimização do `Fluxo_Usuarios-v2` (30% mais rápido).
- Reorganização do `Script_Usuarios-v2` para gerar tabelas com nomes únicos.
- Refatoração da `tela_inicial` com contêineres flexíveis.
- Uso de coleções nas telas `tela_detalhes_cursos` e `tela_detalhes_usuarios` para melhorar performance.
- Atualização completa da documentação (`README.md`, `CHANGELOG.md`).

---
## [109] - 2025-08-04

### 🆕 Adicionado
- **Módulo de Gestão de Usuários SAE:** Criação da lista `LST_Usuarios_SAE`.
- **Fluxo de Sincronização SAE:** Sincroniza lista a partir de Excel, com lógica de inativação.
- **Telas de Reconciliação:** `TelaGerenciarUsuariosSAE` e `TelaDetalhesUsuarioSAE`.
- **Pré-processamento com Office Scripts:** Script mestre para limpar e formatar relatórios.
  
### 🛠️ Corrigido
- Otimização de filtros complexos para serem delegáveis.
- Correções em conversões de tipo (Datas, Números, Booleanos) no Power Automate.

### 🔧 Alterado
- Redefinição do escopo do Power App como ferramenta de consulta.
- Lógica do fluxo principal do Moodle ajustada para consultar `LST_Usuarios_SAE`.

### ❌ Removido
- Remoção das funcionalidades de criação/edição de usuários e cursos nas listas principais.

---
## [068] – 2025-07-31

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

## [052] – 2025-07-14

### 🆕 Adicionado
- Funcionalidade completa de CRUD para Usuários e Cursos no Power App para manter o controle dos dados nas etapas iniciais de desenvolvimento.
- Telas de formulário (`TelaEditarUsuario`, `TelaNovoUsuario`, etc.) utilizando o controle `Formulário de Edição`.
- Lógica de `NewForm()` e `ResetForm()` para gerenciamento do estado dos formulários.
- Implementado pop-up de confirmação para a ação de excluir.

---

## [037] – 2025-07-09

### 🆕 Adicionado
- **Power App (Interface de Leitura):**
  - `TelaInicial` com indicadores de contagem (`CountRows()`) e navegação principal.
  - `TelaUsuarios` e `TelaCursos` com galerias e caixas de busca.
  - Estruturação das galerias e rótulos iniciais da `TelaDetalhesUsuario` e `TelaDetalhesCurso` para visualização 360°, incluindo sub-galerias para dados relacionados.

---

## [010] – 2025-06-27

### 🆕 Adicionado
- **Base de Dados:** Criadas as 4 listas iniciais no SharePoint (`LST_Usuarios`, `LST_Cursos`, `LST_Lotacoes`, `LST_Usuarios-Cursos`).
- **Power App (Interface de Leitura):**
  - Definição das telas e layouts básicos: `TelaInicial`, `TelaUsuarios`, `TelaCursos`, `TelaDetalhesUsuario` e `TelaDetalhesCurso`.

---

## Versão Conceitual – 2025-01-01
- **Power Automate:** `Relatorios_ESAE_Teste`
- **Recebimento de Relatórios do Moodle:** Automático para IDs 1, 2 e 3, com envio para os e-mails relacionados.
- **Scripts Utilizados:** `Relatorio_ESAE_Testes`, `Criar_Tabela_1`, `Mudar_Datas`, `Criar_Tabelas_Dinamicas`.
- **Status de Execução:**
  - ID = 1 rodando normalmente a cada semana.
  - IDs 2 e 3 pausados, executados sob solicitação do gestor.

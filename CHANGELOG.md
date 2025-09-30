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
- [ ] **Filtros Adicionais na Tela de Conclusões:** Implementar novos filtros na `TelaConclusoesRecentes` (ex: "Este Mês", "Últimos 7 dias") para facilitar a análise dos gestores.
- [ ] **Botão de Acesso ao Power BI:** Adicionar um botão na `tela_inicial` para abrir o relatório completo no Power BI (`Launch()` function).
- [ ] **Manual do Usuário:** Criar um guia inicial para os usuários entenderem como as bases de dados e o sistema funcionam.
- [ ] **Fluxo de Ingestão AJS-NS:** Desenvolver um novo fluxo de trabalho para processar a lista de AJS-NS, que é recebida em um formato diferente (apenas nomes). O fluxo precisará buscar e validar os e-mails no Microsoft 365.
- [ ] **Fluxo de Ingestão Coordenadores Setoriais:** Desenvolver um novo fluxo de trabalho para processar a lista de Coordenadores das Setoriais.


### ✅ Melhorar
- [ ] **Interface Gráfica Responsiva:** Refatorar as telas restantes do Power App utilizando Contêineres de Layout para garantir a adaptabilidade a dispositivos móveis em modo vertical.
- [ ] **Tratamento de Erros Avançado:** Implementar um sistema de notificação por e-mail no Power Automate para alertar administradores sobre falhas na execução dos fluxos.
- [ ] **Otimizar Fluxo de Ingestão de Usuários:** Continuar a otimização do fluxo, com foco em reduzir a redundância e o número de chamadas para garantir que não exceda os limites diários da plataforma.
- [ ] **Conexão Direta do Power BI:** Adequar as bases de dados dos dashboards do Power BI para se conectarem diretamente às listas do SharePoint.

---
## Work in Progress

**Notas para a nova versão - Versão atual: 204**

### 🆕 Adicionado
- ✅ Documentar a descrição e especificação para a montagem de cada fluxo do power automate.
- ✅ Criação do manual inicial para orientar usuários sobre funcionamento das bases e dados.
- ✅ Distribuir as descrições dos arquivos no github para cada área, dividindo a documentação que antes estava centralizada.
- ✅ Adicionado documentação fr concepção do projeto, como diagramas e arquivos.

### 🛠️ Corrigido
- Ajustado as fórmulas para a inclusão das datas de conclusão dos usuarios, o fluxo do power automate não reconhecia as datas de conclusão em algumas circunstâncias.
- Incluir botão para abrir o BI completo (comando e telas prontas).
- Adequar bases dos dashboards do BI para conexão direta ao SharePoint.
- Rodar novamente a ingestão de dados para atualizar colunas, período já efetuado: (01/08/2025-22/09/2025)(01/07/2025-01/08/2025) | rodando: (01/06/2025-01/07/2025)
- Agendamento do Moodle ainda é manual; após normalização, configurar execução diária às 6h.

### 📌 Notas de Desenvolvimento
- inicio dos novos dashboards para o BI 2025-09-29
- criar um dashboard para visualizar horas de capacitação por mes, quadrimestre, entre outros pontos de gestão.
- manter as relações já construidas no dash anterior
- planejar como será atendida as demandas e cálculos de cursos externos à plataforma moodle (forms, fluxo, ...)
  
---
## [202] - 2025-09-12

### 🆕 Adicionado
- **Gráficos no Dashboard:** Inclusão de gráficos de colunas e pizza para análise de cursos e distribuição de usuários.
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

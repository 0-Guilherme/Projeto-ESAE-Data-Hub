# Data Hub - ESAE
![Microsoft](https://img.shields.io/badge/Microsoft-PowerApps%20and%20PowerAutomate-blue)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

Uma Plataforma para Análise de Usuários e Cursos do Moodle, desenvolvida em Power Apps, Power Automate e Office Scripts.

*Este Documento contém o CHANGELOG e o KNOW_ISSUES*

---

## Índice
1. [Sobre](#sobre)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Funcionalidades Principais](#funcionalidades-principais)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Banco de Dados](#banco-de-dados)
6. [Pontos de Atenção e Roadmap de Evolução](#Pontos-de-Atenção-e-Roadmap-de-Evolução)
7. [Changelog](#changelog)
8. [Mudanças Futuras](#não-lançado---planejamento-para-próximas-versões)
9. [Versão 0.5.0](#050---2025-09-16)
10. [Versão 0.4.0](#040---2025-08-28)
11. [Versão 0.3.0](#030---2025-08-04)
12. [Versão 0.2.0](#020---2025-07-10)
13. [Versão 0.1.0](#010---2025-06-22)
14. [Know Issues](#know_issues---problemas-conhecidos-e-suas-limitações)
15. [Suporte](#-suporte)

---

# SOBRE

O **Data Hub ESAE** é uma plataforma integrada e automatizada, construída sobre o ecossistema Microsoft Power Platform. O sistema foi projetado para centralizar, limpar, gerenciar e analisar todos os dados de participação em cursos e eventos oferecidos pela instituição, transformando relatórios brutos de múltiplas fontes (Moodle, listas SAE) em uma base de dados única, confiável e interativa.

Ele resolve o desafio de um processo anteriormente manual, demorado e sujeito a erros, que dependia de planilhas descentralizadas e dados inconsistentes.

---

# Tecnologias Utilizadas

* **Microsoft Power Apps (Canvas App):** Para a camada de apresentação e interface do usuário.
* **Microsoft Power Automate:** Para a camada de orquestração e automação dos fluxos de trabalho.
* **Microsoft SharePoint Online:** Para a camada de dados (banco de dados relacional).
* **Microsoft Office Scripts (TypeScript):** Para a camada de transformação e limpeza de dados (ETL).

---

# Funcionalidades Principais

* **Centralização de Dados:** Consolida informações de fontes distintas (Moodle, SAE) em uma base de dados única e padronizada.
* **Automação de ETL de Ponta a Ponta:** Automatiza todo o processo de Extração, Transformação (limpeza e padronização com Office Scripts) e Carga (sincronização com SharePoint via Power Automate).
* **Gestão e Visualização 360°:** Permite a visualização, pesquisa e filtragem de todo o histórico de usuários e suas participações em cursos, bem como o perfil detalhado de cada curso e seus participantes.
* **Sincronização Inteligente:** Gerencia o ciclo de vida dos registros, realizando operações de criação, atualização e inativação de forma automática.
* **Análise e Dashboards:** Oferece um cockpit de controle (Power App) com visões gerenciais, gráficos interativos e indicadores de performance (KPIs).
* **Auditoria de Dados:** Inclui funcionalidades e automações para reconciliar e auditar dados de diferentes fontes, sinalizando inconsistências para revisão.

---

# Estrutura do Projeto

A arquitetura do sistema é baseada em quatro pilares principais, que representam as camadas lógicas da solução, orquestradas pelo ecossistema Power Platform.

* **Pilar 1: Camada de Dados (Onde a informação vive)**
    * **Tecnologia:** SharePoint Online
    * **Função:** Atua como a base de dados central do sistema, utilizando um modelo relacional implementado através de listas interligadas para armazenar as informações de forma estruturada.

* **Pilar 2: Camada de Transformação de Dados (Onde a informação é limpa)**
    * **Tecnologia:** Office Scripts
    * **Função:** Realiza a limpeza e padronização dos relatórios brutos recebidos, garantindo a qualidade e a consistência dos dados antes de serem carregados no sistema.

* **Pilar 3: Camada de Orquestração e Automação (Onde a mágica acontece)**
    * **Tecnologia:** Power Automate
    * **Função:** É o motor que automatiza todo o fluxo de trabalho. Ele executa os scripts de limpeza, lê os dados transformados e orquestra a sincronização com a camada de dados no SharePoint.

* **Pilar 4: Camada de Apresentação e Análise (Onde o usuário interage)**
    * **Tecnologia:** Power Apps
    * **Função:** Serve como a interface do usuário final (administradores e gestores). Permite a consulta, visualização e análise dos dados consolidados através de dashboards e ferramentas de pesquisa.

---

# Banco de Dados

A camada de dados foi implementada utilizando **Listas do SharePoint Online**. As principais listas (tabelas) são:

* **`LST_Usuarios`:**
    * **Descrição:** Armazena o cadastro único de todos os participantes que têm registros no Moodle.
    * **Campos Principais:** `ID`, `NomeCompleto (Title)`, `PK_Email`, `Tipo_Usuario`, `Usuario_SAE_Lookup` (Lookup para LST_Usuarios_SAE), `StatusDeConsistencia`, `QtdConclusoes`.

* **`LST_Cursos`:**
    * **Descrição:** Armazena o catálogo de todos os cursos, eventos e capacitações oferecidos.
    * **Campos Principais:** `ID`, `Nome_Curso (Title)`, `PK_ID_Curso`, `DataInicioCurso`, `DataTerminoCurso`, `Carga_Horaria`, `Categoria`, `QtdAlunos`.

* **`LST_Usuarios_SAE`:**
    * **Descrição:** Funciona como a "fonte da verdade" para a lista de usuários externos (SAE), vinda de múltiplas fontes.
    * **Campos Principais:** `ID`, `NomeCompleto (Title)`, `Email_SAE`, `Lotacao_SAE`, `Cargo_SAE`, `OrigemDados`, `Status` (Ativo/Inativo/Verificar!).

* **`LST_Lotacoes`:**
    * **Descrição:** Armazena uma lista de lotações únicas, para padronização e filtragem.
    * **Campos Principais:** `ID`, `Lotacao (Title)`.

* **`LST_Usuarios-Cursos` (Tabela de Junção):**
    * **Descrição:** Relaciona os usuários aos cursos que eles participaram, registrando a inscrição e a conclusão.
    * **Campos Principais:** `ID`, `FK_Usuario` (Lookup para LST_Usuarios), `FK_Curso_ID` (Lookup para LST_Cursos), `StatusAluno`, `Data_Inscricao`, `Data_Conclusao`.

---

# Pontos de Atenção e Roadmap de Evolução

Esta seção documenta áreas que exigem monitoramento e possíveis melhorias futuras.

* **Escalabilidade da Camada de Dados:** A solução atual utiliza o SharePoint. Com o aumento massivo de volume de dados, uma futura evolução seria migrar a base para o **Microsoft Dataverse** ou um banco de dados **Azure SQL** para otimizar a performance em larga escala.
* **Automação Completa do Gatilho:** Atualmente, os fluxos são iniciados manualmente. O próximo passo é evoluir para gatilhos 100% automáticos, como o monitoramento de uma pasta no OneDrive ou caixa de e-mail.
* **Limites de Delegação do Power Apps:** É crucial que todas as novas consultas e filtros no aplicativo sejam construídos utilizando funções delegáveis para garantir que toda a base de dados seja analisada, e não apenas os primeiros 2.000 registros.
* **Monitoramento e Tratamento de Erros:** Implementar um sistema de log e notificação mais robusto no Power Automate para capturar e relatar falhas durante o processo de sincronização de forma proativa.
* **Ferramenta de Mesclagem de Lotações:** Desenvolver a funcionalidade planejada para permitir que administradores unifiquem registros de lotações inconsistentes.

---

# CHANGELOG 

Todos as mudanças notáveis neste projeto estão documentadas neste arquivo.

---

## [0.5.0] - 2025-09-16
### Adicionado
- O fluxo SAE-CGAJAPDI-Servidores-v2 está apto a gerar uma lista em excel com os novos usuários.
- A LST_Usuarios agora tem uma coluna com Data da Última Modificação.
- Fluxo_Usuarios-v2 30% mais eficiente após as mudanças. Para enviar o email, usar assunto "Fluxo_Usuarios_Moodle".
- Script_Usuarios-v2 foi separado em tabelas com nomes únicos para diminuir a quantidade de tempo gasto em loops entre as listas de nomes e conclusões.
- Fluxo_SAE-CGAJAPDI-Servidores-v2 está apto a rodar na nuvem em sua totalidade. Basta enviar e-mail, assunto "Fluxo_Atualizar_SAE".
- Script_SAE-CGAJAPDI-Servidores-v4.0.0 está totalmente atualizado e funcional.
- tela_inicial do App foi refatorada para containers flexiveis para multiplas telas.
- tela_inicial alteração na localização das estatisticas iniciais, sairam dos botões e agora estão no rodapé.
- tela_editar_cursos e tela_editar_usuarios tiveram os botões de navegação removidos.
- Fluxo_Auditor agora também executa a contagens de usuários em cada curso.
- Atualização da descrição do projeto em 2025-09-16, anexando informações sobre a estrutura e definições do sistema.

### Trabalhando
- tela_dashboard INICIAL criada.
- tentando inclusões de alguns gráficos e indicadores, pelo que vi o melhor via ser trabalhar cada tela com um modelo ou método de gráfico.
- primeiro grafico horizontal criado a partir de galeria, ele lista o nome a barra e quantidade total de alunos. Possiveis melhorias: colocar para resetar o tamanho "maximo" da barra quando selecionar um novo filtro // podemos duplicar para ver quantos alunos temos que concluiram o curso.
- agora com navegação clicavel para o curso selecionado.
- o que pensei: montar alguma janela para mostra as estatisticas de quantos usuarios fizeram o que nos ultimos 30 dias, 7 dias e no dia. como por exemplo: grafico por tipo de usuario, quantidade por curso talvez tabela, algo que podemos mudar como "inscrições e conclusões" algum switch ou algo do genero.
- tentar incluir analise relativa ao semestre, como grafico de pizza para tipos_usuarios, tipos_curso, numeros absolutos, e amostragem rapida dos ultimos 7 dias.
- necessario incluir um botão para levar ao BI completo, que ainda vamos desenvolver, dentro do aplicativo não vai ser possivel, está ficando extremamente pesado para a plataforma.
- tela_db_cursos criada com 3 filtros de dropbox,categoria do curso, semestre em que iniciou, e é inscrições ou conclusões.
- PROBLEMAS: CURSOS NÃO TEM DIVISÃO ENTRE AS TURMAS, COMO PENSAR ISSO PARA O FLUXO DO POWERAPPS? necessario dividir ou só aceitar aqui e ir para o powerBI e la separar por turmas.
- testes com a tela_inicial pronta para adaptação em celular horizontal e vertical.
- ajustes ao longo de todo o readme.md
- (esse fluxo durou 8horas para 5000 registros - deve ser incluido no meio do fluxo já usado) ajustes na lógica de carregamento nos dados do power apps para passar do limite de 2000 delegações ao sharepoint, agora temos uma coluna FK_Curso_in_Text que é preenchida com o numero de ID do curso no sharepoint, assim não usando delegações.
- é necessario acrescentar a logica de preencher coluna FK_Curso_in_Text na LST_Usuarios-Cursos, de forma que o fluxo inclua automaticamente quando rodar.
- o OnVisible da tela_detalhes_cursos agora utiliza uma coleção para exibir a lista de alunos
- aplicar esta mesma lógica para a listagem dos cursos concluidos por cada aluno na tela_detalhes_usuarios - em processo



### Informações Extras
- Tentar Try and Catch para achar problemas no fluxo, ou separar a informação.
- Última ingestão de dados em 02/09/2025
- Versão do App: 121

---

# Planejamento para Novas Versões

Este documento descreve o roteiro de desenvolvimento para futuras versões do sistema, focando em agregar valor, robustez e novas funcionalidades à base já construída.

## [Não Lançado] - Planejamento para Próximas Versões

### Adicionar
- [ ] **Gráficos no Dashboard:** Inclusão de elementos visuais de BI na tela principal para análise de dados (`Gráfico de Colunas` para Top Cursos, `Gráfico de Pizza` para distribuição de usuários).
- [ ] **Ferramenta de Mesclagem de Lotações:** Nova tela no Power App e fluxo associado para permitir que administradores corrijam e unifiquem registros de lotações duplicados.
- [ ] **Filtros Adicionais na Tela de Conclusões:** Implementar novos filtros na `TelaConclusoesRecentes` (ex: "Este Mês", "Últimos 7 dias") para facilitar a análise dos gestores.

### Melhorar
- [ ] **Interface Gráfica Responsiva:** Refatorar as telas do Power App utilizando Contêineres de Layout para garantir a adaptabilidade a dispositivos móveis em modo vertical.
      - tela_inicial ja foi refatorada para responsividade em multiplas telas e orientações.
- [ ] **Otimizar Fluxo de Dados da `LST_Usuarios`:** Revisar o fluxo de sincronização para reduzir o número de chamadas e otimizar a performance, garantindo que não exceda os limites diários de solicitações da plataforma.
      - o fluxo ja foi refatorado e melhorado em 30% do tempo total de execução.
- [ ] **Tratamento de Erros Avançado:** Implementar um sistema de notificação por e-mail no Power Automate para alertar administradores sobre falhas na execução dos fluxos.
- [ ] **Fluxo de Ingestão AJS-NS:** Desenvolver um novo fluxo de trabalho para processar a lista de AJS-NS, que é recebida em um formato diferente (apenas nomes). O fluxo precisará buscar e validar os e-mails no Microsoft 365 para enriquecer os dados antes de sincronizá-los.
- [ ] **Fluxo de Ingestão da CGAJAPI:** Automatizar o fluxo para usar gatilho por email e processar automaticamente.
      - fluxo ja está automaziada por gatilho em e-mail.
      - fluxo foi retrabalhado e melhorado para aumentar a velocidade de processamento de dados.
- [ ] **Fluxo Auditor:** Adicionar contagem de usuarios e usuarios que concluiram nas telas refatoradas, mas para isso precisamos da contagem na base de dados.

---

### Fluxo dos Relatórios - BETA - (Silvia)
- Power Automate: Relatorios_ESAE_Teste
- Recebe Relatorio do Moodle: Automatico_ID=1 =2 =3 e envia para o e-mail relacionado
- Scripts Utilizados - Relatorio_ESAE_Testes - Criar_Tabela_1 // Mudar_Datas // Criar_Tabelas_Dinamicas
- ID = 1 Rodando normalmente a cada semana. ID = 2 e 3 Pausados, rodando sob solicitação do Rodrigo

---

## [0.4.0] - 2025-08-28

### Adicionado
- **Módulo de Gestão de Usuários SAE:** Criada a lista `LST_Usuarios_SAE` para servir como "fonte da verdade" para usuários externos.
- **Fluxo de Sincronização SAE:** Criado um novo fluxo no Power Automate para sincronizar a lista `LST_Usuarios_SAE` a partir de um arquivo Excel, incluindo lógica de inativação de usuários removidos.
- **Telas de Reconciliação no Power App:** Criadas as telas `TelaGerenciarUsuariosSAE` (com filtros) e `TelaDetalhesUsuarioSAE` (para comparação lado a lado dos dados SAE vs. Moodle).
- **Fluxo "Auditor":** Implementada uma automação agendada para verificar e sinalizar inconsistências de status entre as listas `LST_Usuarios` e `LST_Usuarios_SAE`.
- **Pré-processamento com Office Scripts:** Criado um script mestre para limpar e formatar os relatórios do Excel (SAE e Moodle) antes da ingestão de dados.

### Alterado
- **Escopo do Power App:** O aplicativo foi redefinido como uma ferramenta de **visualização e consulta** para os dados do Moodle.
- **Fluxo Principal do Moodle:** A lógica de preenchimento do campo `Usuario_SAE` foi alterada para consultar a lista `LST_Usuarios_SAE`.

### Removido
- **Funcionalidade de Edição/Criação:** As telas e botões para criar/editar/excluir usuários e cursos das listas principais foram removidos.

### Corrigido
- **Filtros Complexos não Delegáveis:** Otimizadas as fórmulas de filtro em várias telas (como `TelaAuditoria`) para serem delegáveis ao SharePoint, utilizando `SortByColumns` e reestruturando a lógica para resolver problemas de performance e os limites de delegação de dados.
- Múltiplos erros de conversão de tipo de dado (Datas, Números, Booleanos) no Power Automate.

---

## [0.3.0] - 2025-08-04

### Adicionado
- **Fluxo de Ingestão de Dados (Power Automate):** Criado o fluxo principal acionado por arquivo no OneDrive para sincronizar os dados do Moodle com o SharePoint.
- **Lógica de Sincronização Otimizada:** Implementado o padrão de "Selecionar" e "Compor" (`union`) para processar apenas usuários e cursos únicos, melhorando a performance.
- **Lógica de "Check-then-Create/Update":** O fluxo agora verifica se um registro já existe antes de criá-lo, para evitar duplicatas.
- **Contagem Automática de Alunos:** Adicionada uma etapa ao final do fluxo de ingestão que calcula e atualiza a coluna `QtdAlunos`.
- **Tela de "Conclusões Recentes":** Criada tela no Power App para exibir conclusões dos últimos meses, com filtros de data dinâmicos.

### Corrigido
- **Problemas de Delegação:** Otimizadas as fórmulas das galerias nas telas de detalhes com `SortByColumns` para resolver problemas de lentidão com mais de 2000 itens.
- **Erros de Tipo de Dado:** Resolvidos múltiplos erros de conversão de dados (Datas, Números, Booleanos) no Power Automate.

---

## [0.2.0] - 2025-07-10

### Adicionado
- Funcionalidade completa de CRUD para Usuários e Cursos no Power App para manter o controle dos dados nas etapas iniciais de desenvolvimento.
- Telas de formulário (`TelaEditarUsuario`, `TelaNovoUsuario`, etc.) utilizando o controle `Formulário de Edição`.
- Lógica de `NewForm()` e `ResetForm()` para gerenciamento do estado dos formulários.
- Implementado pop-up de confirmação para a ação de excluir.

---

## [0.1.0] - 2025-06-22

### Adicionado
- **Base de Dados:** Criadas as 4 listas iniciais no SharePoint (`LST_Usuarios`, `LST_Cursos`, `LST_Lotacoes`, `LST_Usuarios-Cursos`).
- **Power App (Interface de Leitura):**
    - `TelaDashboard` com indicadores de contagem (`CountRows()`) e navegação principal.
    - `TelaUsuarios` e `TelaCursos` com galerias e caixas de busca.
    - `TelaDetalhesUsuario` e `TelaDetalhesCurso` para visualização 360°, incluindo sub-galerias para dados relacionados.
    - Navegação cruzada entre as telas de detalhes.

---

## KNOW_ISSUES - Problemas Conhecidos e Suas Limitações

Este documento rastreia bugs conhecidos, limitações de arquitetura e potenciais problemas da solução atual.

---

## Integridade dos Dados

### Duplicata de Nomes (Script) 🔵
- **Problema:** Foi identificado um caso raro em que o script de limpeza do Excel pode não detectar um nome duplicado se ele contiver caracteres invisíveis ou formatações muito específicas.
- **Impacto:** Baixo. A lógica de verificação por e-mail (que é único) no fluxo do Power Automate serve como uma segunda camada de proteção contra a criação de usuários duplicados.

## Automação (Power Automate)

### Tratamento de Erros 🟡
- **Problema:** O fluxo de ingestão principal foi construído para ser resiliente (continua mesmo que a busca no Teams falhe), mas não possui um sistema avançado para registrar ou notificar sobre cada linha individual do Excel que possa falhar por outros motivos (ex: uma lotação que não foi encontrada).
- **Impacto:** Médio. Uma execução pode terminar com sucesso, mas algumas linhas podem não ter sido processadas.
- **Solução Planejada:** Implementar uma ramificação de tratamento de erros que, em caso de falha em uma etapa crítica (como a busca de ID de Lotação), registre o erro em uma lista do SharePoint ou envie um e-mail de alerta para o administrador.

### Sobrecarga de Dados 🔵 
- **Status:** ✅ Resolvido na versão 0.5.0 - Fluxo 30% mais rápido.
- **Problema:** O fluxo de ingestão principal foi construído com muitas redundancias, gerando uma quantidade de loop desnecessária para as versões futuras.
- **Impacto:** Baixo. Dependendo da quantidade de dados pode exeder o limite de 10.000 solicitações diárias, deixando o fluxo lento.
- **Solução Planejada:** Otimizar o fluxo, utilizando tabelas de nomes de usuarios unicos e cursos unicos, a fim de reduzir a redundancia no preenchimento das LST_Usuarios e LST_Cursos, mantendo o fluxo completo para a LST_Usuarios-Curso.

### Fluxo dos AJS-NS 🟡
- **Problema:** O fluxo para ingestão dos dados da lista dos AJS-NS não esta configuado diretamente para o formato em que recebemos.
- **Impacto:** Médio. Necessario ajustar para a correta ingestão, uma vez que apenas recebemos os nomes via planilha, diferente da CGAJAPDI que vem a tabela com todos os dados completo.
- **Solução Planejada:** Ajustar para utilizar apenas o Nome do Ususario para preencher os dados, fazendo buscas no teams para capturar o email do usuario, possivelmente sendo necessario analisar mais de um e-mail deste usuario para o colocar na lista.

## Desempenho (Power Apps)

### Interface Gráfica 🔵
- **Status:** ❌ NÃO RESOLVIDO - Porém, a Tela Inicial ja está refatorada para containers flexiveis.
- **Problema:** A tela do aplicativo não é adaptavel para dispositivos móveis.
- **Impacto:** Em telas menores a unica forma de funcionalidade atual é utilizar na horiontal, virando a tela, o que precisamos e adaptar para vertical e manter todas as funcionalidades visuais.
- **Solução Planejada:** Criar layout adaptativo ou diretamente para o Mobile.

```
### Fluxo dos AJS-NS 🔴 🟡 🔵 🟢
- **STATUS:** ✅ ❌ RESOLVIDO
- **MÉTODO:**   

- **Problema:**
- **Impacto:**
- **Solução Planejada:**
```

## 📞 Suporte

Para problemas não listados aqui:
1. Consulte o `CHANGELOG.md` para mudanças recentes
2. Contato Teams: e-guilherme-ramos@pge.rs.gov.br

---

**Última Atualização**: 2025-00-00

**Versão do Documento**: 0.0.0






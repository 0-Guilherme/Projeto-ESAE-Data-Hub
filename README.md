# Data Hub - ESAE
![Microsoft](https://img.shields.io/badge/Microsoft-PowerApps%20and%20PowerAutomate-blue)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

Uma Plataforma para Análise de Usuários e Cursos do Moodle, desenvolvida em Power Apps, Power Automate e Office Scripts.

*Este Documento contém temporáriamente toda a Documentação*

*Proxima alteração ja deixará o documento separado em 5 Partes: Readme; Changelog; Know_Issues; Detalhamento_Telas; Arquitetura_Dados*

*Documentação Inicial utilizada para definição do projeto será adicionada posteriormente em .pdf*

---
## Índice
1. [Sobre](#sobre)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Funcionalidades Principais](#funcionalidades-principais)
4. [Resultados Obtidos](#resultados-obtidos)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Banco de Dados](#banco-de-dados)
7. [Pontos de Atenção e Roadmap de Evolução](#Pontos-de-Atenção-e-Roadmap-de-Evolução)
8. [Descrição das Pastas](#descrição-das-pastas)
9. [Telas do Aplicativo - Descrição Funcional](#telas-do-aplicativo---descrição-funcional)
10. [Changelog](#changelog)
19. [Know Issues](#know_issues---problemas-conhecidos-e-suas-limitações)
20. [Suporte](#-suporte)

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

* ✅ **Centralização de Dados:** Consolida informações de fontes distintas (Moodle, SAE) em uma base de dados única e padronizada.
* ✅ **Automação de ETL de Ponta a Ponta:** Automatiza todo o processo de Extração, Transformação (limpeza com Office Scripts) e Carga (sincronização com SharePoint via Power Automate).
* ✅ **Gestão e Visualização 360°:** Permite a visualização, pesquisa e filtragem do histórico de usuários e suas participações em cursos.
* ✅ **Sincronização Inteligente:** Gerencia o ciclo de vida dos registros, realizando operações de criação, atualização e inativação de forma automática.
* ✅ **Análise e Dashboards:** Oferece um cockpit de controle (Power App) com visões gerenciais, gráficos interativos e KPIs.
* ✅ **Auditoria de Dados:** Inclui funcionalidades e automações para reconciliar dados de diferentes fontes.
* ✅ **Fluxo da CGAJAPDI:** Automação completa para processamento e verificação da lista de usuários SAE.

---
# Resultados Obtidos

* ✅ **Automação Completa de Relatórios do Moodle**: Relatórios são exportados, processados e incluídos em bases de dados de forma automática, prontos para serem consumidos por outros componentes da rede.
* ✅ **Automação Completa do Fluxo da CGAJAPDI**: Redução de 98% no tempo de processamento e verificação da lista de usuários, que antes era manual e demorava dias, para poucos minutos.
* ✅ **Relatórios de Power BI Atualizados**: Gestores agora têm conexão com uma base padronizada para atualização dos dashboards do Power BI, podendo verificar estatísticas iniciais dentro do próprio Power App.

---

# Concepção do Projeto e Análise Inicial

O desenvolvimento deste projeto foi guiado por um documento de análise e concepção inicial, elaborado em formato Word. Este documento serviu como a base para a definição do escopo, modelagem de dados e planejamento das funcionalidades.

Ele contém a primeira versão da arquitetura, os diagramas de entidade-relacionamento (DER) e os fluxogramas de atividades que nortearam as fases iniciais do desenvolvimento.

* **➡️ [Clique aqui para acessar o Documento de Concepção Inicial (PDF)](./Documentacao/projeto_inicial_esae_data_hub.pdf)**

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

### ➡️ [Clique aqui para ver a Descrição Detalhada da Arquitetura de Dados](./Documentacao/Arquitetura_de_dados.md)

A camada de dados foi implementada utilizando **Listas do SharePoint Online**, configuradas para simular um modelo de banco de dados relacional.

Incluir esta parte e mover a montagem para um segundo documento

A camada de dados foi implementada utilizando **Listas do SharePoint Online**. As principais são:

* `LST_Usuarios`
* `LST_Cursos`
* `LST_Lotacoes`
* `LST_Usuarios_SAE`
* `LST_Usuarios-Cursos`

### Diagrama de Entidade-Relacionamento

O diagrama abaixo representa a estrutura relacional das listas do SharePoint.

![Diagrama de Entidade-Relacionamento](Documentacao/Imagens/Diagrama_Entidade_Relacionamento.png)

---
# Pontos de Atenção e Roadmap de Evolução

Esta seção documenta áreas que exigem monitoramento e possíveis melhorias futuras.

* **Escalabilidade da Camada de Dados:** A solução atual utiliza o SharePoint. Com o aumento massivo de volume de dados, uma futura evolução seria migrar a base para o **Microsoft Dataverse** ou um banco de dados **Azure SQL** para otimizar a performance em larga escala.
* **Limites de Delegação do Power Apps:** É crucial que todas as novas consultas e filtros no aplicativo sejam construídos utilizando funções delegáveis para garantir que toda a base de dados seja analisada, e não apenas os primeiros 2.000 (powerapp) / 5.0000 (sharepoint) registros.
* **Monitoramento e Tratamento de Erros:** Implementar um sistema de log e notificação mais robusto no Power Automate para capturar e relatar falhas durante o processo de sincronização de forma proativa.
* **Ferramenta de Mesclagem de Lotações:** Desenvolver a funcionalidade planejada para permitir que administradores unifiquem registros de lotações inconsistentes.

---
# Descrição das Pastas
```
Projeto-ESAE-Data-Hub/
├── Documentacao/Imagens      # Imagens utilizadas neste arquivo
├── Documentacao/Scripts      # Scripts utilizados nos fluxos
└── Readme.md                 # Este arquivo
```

---
# Telas do Aplicativo: Descrição Funcional

A documentação detalhada de cada tela, incluindo a descrição de suas funcionalidades, principais controles e lógicas de fórmulas, foi consolidada em um documento separado para maior clareza.

### ➡️ [Clique aqui para ver a Descrição Detalhada de Todas as Telas](./Documentacao/Telas_do_aplicativo.md)

---
# Descrição detalhada dos fluxos do Power Automate

adicionar descrição resumo ou algo assim

### ➡️ [Clique aqui para ver a Descrição Detalhada do Fluxo Auditor](./Documentacao/Descricao_Fluxo_Auditor.md)
### ➡️ [Clique aqui para ver a Descrição Detalhada do Fluxo CGAJAPDI](./Documentacao/Descricao_Fluxo_CGAJAPI.md)
### ➡️ [Clique aqui para ver a Descrição Detalhada do Fluxo de Usuarios do Moodle](./Documentacao/Descricao_Fluxo_Usuarios_Moodle.md)

---
# Changelog

adicionar descrição resumo ou algo assim

### ➡️ [Clique aqui para ver a Descrição Detalhada do Changelog](./Documentacao/Changelog.md)

---
# Know Issues

adicionar descrição resumo ou algo assim

### ➡️ [Clique aqui para ver a Descrição Detalhada do Know Issues](./Documentacao/Know_Issues.md)

---


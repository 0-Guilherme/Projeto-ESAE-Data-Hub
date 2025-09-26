# Arquitetura de Dados

A camada de dados foi implementada utilizando **Listas do SharePoint Online**, configuradas para simular um modelo de banco de dados relacional.

### `LST_Usuarios`
**Descrição:** Armazena o cadastro único de todos os participantes que possuem registros no Moodle. É a tabela principal de "alunos" do sistema.

| Nome da Coluna | Tipo de Dado | Descrição / Propriedades |
| :--- | :--- | :--- |
| `Title` | Texto Simples | **Nome de Exibição:** `NomeCompleto`. Armazena o nome completo do usuário. |
| `PK_Email` | Texto Simples | Chave primária lógica para o usuário. Configurado para **valores exclusivos**. |
| `Lotacao` | Pesquisa (Lookup) | Aponta para o `ID` da lista `LST_Lotacoes` para garantir a padronização. |
| `Lotacao_Teams` | Texto Simples | Armazena o departamento do usuário, buscado do perfil do Microsoft 365 (Teams/Outlook). |
| `Tipo_Usuarios` | Escolha (Choice) | Define o vínculo do usuário (ex: "Servidor", "Estagiário", "Procurador do Estado"). |
| `Usuario_SAE_Lookup`| Pesquisa (Lookup) | Aponta para o `ID` da lista `LST_Usuarios_SAE` para criar um vínculo relacional. |
| `ValidarSAE` | Escolha (Choice) | Usada pelo fluxo "auditor". **Opções:** `Normal`, `AdicionarSAE`, `RemoverSAE`. |
| `QtdConclusoes` | Número | Armazena o total de cursos concluídos pelo usuário (preenchido por um fluxo). |

### `LST_Cursos`
**Descrição:** Armazena o catálogo de todos os cursos, eventos e capacitações oferecidos.

| Nome da Coluna | Tipo de Dado | Descrição / Propriedades |
| :--- | :--- | :--- |
| `Title` | Texto Simples | **Nome de Exibição:** `Nome_Curso`. Armazena o nome oficial do curso. |
| `PK_ID_Curso` | Número | Chave primária lógica do curso, vinda do Moodle. Configurado para **valores exclusivos**. |
| `Nome_Curto_Curso`| Texto Simples | Armazena o nome breve ou sigla do curso. |
| `DataInicioCurso`| Data e Hora | Data de início oficial do curso. |
| `DataTerminoCurso`| Data e Hora | Data de término oficial do curso. |
| `Carga_Horaria` | Número | Carga horária total do curso, calculada pelo Office Script. |
| `Categoria` | Escolha (Choice) | Categoria do curso (ex: "Cursos", "Palestras"), calculada pelo Office Script. |
| `QtdAlunos` | Número | Armazena o total de alunos que concluíram o curso (preenchido por um fluxo). |

### `LST_Lotacoes`
**Descrição:** Lista mestra que armazena os nomes únicos de todas as lotações para garantir a padronização e facilitar o gerenciamento.

| Nome da Coluna | Tipo de Dado | Descrição / Propriedades |
| :--- | :--- | :--- |
| `Title` | Texto Simples | **Nome de Exibição:** `Nome da Lotação`. Configurado para **valores exclusivos**. |

### `LST_Usuarios_SAE`
**Descrição:** Funciona como a "fonte da verdade" para a lista de usuários externos (SAE), que é sincronizada a partir de relatórios específicos.

| Nome da Coluna | Tipo de Dado | Descrição / Propriedades |
| :--- | :--- | :--- |
| `Title` | Texto Simples | **Nome de Exibição:** `NomeCompletoSAE`. |
| `Email_SAE` | Texto Simples | Chave primária lógica. Configurado para **valores exclusivos**. |
| `Lotacao_SAE` | Texto Simples | Lotação como vem no relatório SAE. |
| `Cargo_SAE` | Texto Simples | Cargo como vem no relatório SAE. |
| `Lotacao_Teams` | Texto Simples | Departamento do usuário, buscado do perfil do Microsoft 365. |
| `Cargo_Teams` | Texto Simples | Cargo do usuário, buscado do perfil do Microsoft 365. |
| `OrigemDados` | Texto Simples | Identifica o relatório de origem (ex: "CGAJAPDI-Servidores"). |
| `Status` | Escolha (Choice) | Ciclo de vida do usuário na lista. **Opções:** `Ativo`, `Inativo`, `Verificar!`. |
| `DataUltimaSincronizacao` | Data e Hora | Data em que o registro foi criado ou atualizado pela última vez pelo fluxo. |

### `LST_Usuarios-Cursos`
**Descrição:** Tabela de junção que cria o vínculo entre um usuário e um curso, registrando cada matrícula e seu status. É a lista mais importante para o histórico.

| Nome da Coluna | Tipo de Dado | Descrição / Propriedades |
| :--- | :--- | :--- |
| `FK_Usuario` | Pesquisa (Lookup) | Vínculo para o `ID` da lista `LST_Usuarios`. |
| `FK_Curso_ID` | Pesquisa (Lookup) | Vínculo para o `ID` da lista `LST_Cursos`. |
| `Data_Inscricao` | Data e Hora | Data em que a inscrição foi registrada. |
| `Data_Conclusao` | Data e Hora | Data em que o curso foi concluído. Fica em branco se apenas inscrito. |
| `StatusAluno` | Escolha (Choice) | Status da matrícula. **Opções:** `Inscrito`, `Concluído`. |
| `FK_Usuario_in_Text` | Texto Simples | **Otimização:** Cópia em texto do `ID` do usuário. Usado para filtros delegáveis. |
| `FK_Curso_in_Text` | Texto Simples | **Otimização:** Cópia em texto do `ID` do curso. Usado para filtros delegáveis. |

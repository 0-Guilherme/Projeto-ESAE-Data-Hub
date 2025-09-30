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

---

# Análise da Arquitetura de Dados: Normalização

A camada de dados do sistema, implementada com **Listas do SharePoint Online**, foi projetada para simular um modelo de banco de dados relacional. Para garantir a integridade, escalabilidade e facilidade de manutenção, a estrutura segue os princípios de normalização de dados, estendendo-se até a Terceira Forma Normal (3FN).

---

### Primeira Forma Normal (1FN): Organização e Atomicidade

A 1FN é a fundação de um banco de dados relacional, garantindo que os dados sejam organizados de forma atômica e não repetitiva.

* **Valores Atômicos:** Cada célula em todas as listas do projeto (`LST_Usuarios`, `LST_Cursos`, etc.) foi projetada para armazenar um **único valor**. Não há campos que contenham listas de informações (ex: múltiplos e-mails em uma única célula).

* **Ausência de Grupos Repetidos:** A criação da lista de junção **`LST_Usuarios-Cursos`** é o principal exemplo de conformidade com a 1FN.
    * **Abordagem Incorreta (Violaria a 1FN):** Ter colunas como `Curso1`, `DataConclusao1`, `Curso2`, `DataConclusao2` na lista `LST_Usuarios`. Isso limitaria o número de cursos por aluno e tornaria as consultas (`"quantos alunos fizeram o curso X?"`) extremamente complexas.
    * **Nossa Abordagem Correta:** Para cada nova conclusão, criamos uma nova **linha** na `LST_Usuarios-Cursos`. Isso permite um número infinito de conclusões por aluno e simplifica drasticamente a análise de dados.

---

### Segunda Forma Normal (2FN): Dependência Funcional Completa

A 2FN foca na lógica dos relacionamentos, garantindo que cada atributo de uma tabela dependa da **chave primária completa**.

* **Exemplo Principal:** A nossa tabela de junção, a `LST_Usuarios-Cursos`.
* **Chave Composta:** A chave que identifica unicamente um registro nesta lista é a **combinação** de `FK_Usuario` + `FK_Curso_ID`.
* **Como Cumprimos:** O campo `Data_Conclusao` nesta lista depende funcionalmente tanto do **usuário** quanto do **curso**. Não faria sentido existir uma data de conclusão sem uma dessas duas informações.
    * **Abordagem Incorreta (Violaria a 2FN):** Se colocássemos o `NomeCompleto` do usuário diretamente na lista `LST_Usuarios-Cursos`. O nome depende apenas do `FK_Usuario`, e não da chave completa. Isso criaria uma redundância massiva de dados (o mesmo nome de usuário repetido para cada curso que ele conclui). Nosso design evita isso ao manter o nome em um único local: na `LST_Usuarios`.

---

### Terceira Forma Normal (3FN): Sem Dependências Transitivas

A 3FN é o nível de otimização que nos dá a maior flexibilidade de manutenção, eliminando dependências indiretas entre os campos.

* **Exemplo Principal:** A criação da lista **`LST_Lotacoes`**.
* **Como Cumprimos:**
    * **Abordagem Incorreta (Violaria a 3FN):** Poderíamos ter colocado a `Lotacao` como um simples campo de texto na `LST_Usuarios`. Isso funcionaria inicialmente, mas criaria um grande problema de manutenção: se o nome de uma lotação mudasse (ex: de "DA" para "Departamento de Administração"), teríamos que encontrar e **atualizar manualmente todos os registros de usuário** que pertencem àquela lotação.
    * **Nossa Abordagem Correta:** Ao criar uma lista separada `LST_Lotacoes` e usar uma coluna de **Pesquisa (Lookup)**, removemos esta "dependência transitiva". Agora, a lotação de um usuário depende apenas do `ID` da lotação. Se o nome da lotação mudar, nós o alteramos em **um único lugar** (`LST_Lotacoes`), e a alteração reflete-se automaticamente em todos os usuários vinculados.

---

### Conclusão

A arquitetura de dados do projeto, ao seguir estes princípios de normalização, garante que o sistema seja:
* **Escalável:** Pode crescer para milhares de registros sem perder a organização.
* **Fácil de Manter:** Alterações em entidades (como o nome de um curso ou de uma lotação) são feitas em um único local.
* **Íntegro:** As regras de negócio e os relacionamentos garantem a consistência e a confiabilidade dos dados a longo prazo.

# Dashboard de Inscrições e Conclusões por Período

## 🎯 Objetivo
Criar um dashboard inteligente e flexível para acompanhar inscrições e conclusões de alunos ao longo do tempo, com recortes por **Ano**, **Semestre** e **Quadrimestre**, usando uma única tabela de calendário como base de filtragem.

---

## 📚 Estrutura de Dados

### 🔹 Tabelas Envolvidas
* **Tabela Fato:** `LST_Usuarios-Cursos` (a lista que contém todos os registros de inscrições e conclusões).
* **Tabela Dimensão:** `dCalendario` (a nossa tabela de calendário, que serve como eixo do tempo).

### 🔹 Tabela de Calendário (`dCalendario`)
Criada como uma Tabela Calculada em DAX para garantir uma base de tempo consistente e contínua para as análises.

```
dCalendario =  
ADDCOLUMNS (  
    CALENDARAUTO(),  
    "Ano", YEAR([Date]),  
    "MesNome", FORMAT([Date], "mmmm"),  
    "MesNumero", MONTH([Date]),  
    "AnoMes", FORMAT([Date], "yyyy-mm"),  
    "Semestre", IF(MONTH([Date]) <= 6, "1º Semestre", "2º Semestre"),  
    "Quadrimestre", SWITCH(  
        TRUE(),  
        MONTH([Date]) <= 4, "1º Quadrimestre",  
        MONTH([Date]) <= 8, "2º Quadrimestre",  
        "3º Quadrimestre"  
    )  
)
```

## 🔗 Relacionamentos no Modelo do Power BI

A arquitetura do modelo de dados no Power BI foi projetada para permitir análises complexas e performáticas, conectando as tabelas de fatos (eventos) com as de dimensão (contexto).

### Relacionamentos Temporais (Análise de Datas)

Para permitir a análise por duas datas diferentes (**inscrição** e **conclusão**) a partir da mesma tabela de fatos, a seguinte estratégia de relacionamentos foi utilizada:

- `dCalendario[Date]` → `LST_Usuarios-Cursos[Data_Inscricao]` (**Relação Ativa**)
- `dCalendario[Date]` → `LST_Usuarios-Cursos[Data_Conclusao]` (**Relação Inativa**)

A relação inativa é ativada sob demanda dentro das medidas DAX utilizando a função `USERELATIONSHIP`, o que permite que a mesma tabela de calendário filtre os dados por duas perspectivas de tempo diferentes.

---

### Relacionamentos Estruturais (Vínculos de Dados)

Os seguintes vínculos formam a espinha dorsal do modelo de dados.

#### 🔹 Relação: Conclusões → Usuários
Conecta cada registro de inscrição/conclusão ao participante correspondente.

* **Tabela de Origem (Muitos):** `LST_Usuarios-Cursos`
* **Coluna de Origem:** `FK_Usuario_in_Text`
* **Tabela de Destino (Um):** `LST_Usuarios`
* **Coluna de Destino:** `ID_Text` *(Coluna calculada que converte o ID numérico para texto)*
* **Cardinalidade:** Muitos para Um (`*..1`)
* **Propósito:** Permite que os filtros aplicados a um usuário (como sua lotação ou tipo) se propaguem para suas respectivas inscrições e conclusões.

#### 🔹 Relação: Conclusões → Cursos
Conecta cada registro de inscrição/conclusão ao curso correspondente.

* **Tabela de Origem (Muitos):** `LST_Usuarios-Cursos`
* **Coluna de Origem:** `FK_Curso_in_Text`
* **Tabela de Destino (Um):** `LST_Cursos`
* **Coluna de Destino:** `PK_ID_Curso_Text` *(Coluna calculada que converte o ID numérico para texto)*
* **Cardinalidade:** Muitos para Um (`*..1`)
* **Propósito:** Permite que os filtros aplicados a um curso (como sua categoria) se propaguem para todos os seus participantes.

#### 🔹 Relação: Usuários → Lotações
Conecta cada usuário à sua lotação oficial, permitindo agrupar e analisar os dados por departamento.

* **Tabela de Origem (Muitos):** `LST_Usuarios`
* **Coluna de Origem:** `Lotacao.Id` *(O ID da coluna de Pesquisa/Lookup)*
* **Tabela de Destino (Um):** `LST_Lotacoes`
* **Coluna de Destino:** `ID`
* **Cardinalidade:** Muitos para Um (`*..1`)
* **Propósito:** Fundamental para a criação de análises de engajamento por lotação.

#### 🔹 Relação Virtual: Usuários → Usuários SAE
A relação entre os usuários do Moodle e os da lista SAE é gerenciada de forma virtual, através de medidas DAX, para máxima flexibilidade.

* **Tabelas Envolvidas:** `LST_Usuarios` e a tabela calculada `SAE_Limpo`.
* **Chave de Ligação:** A coluna `Email` em ambas as tabelas.
* **Método:** A função **`TREATAS`** é utilizada dentro de medidas `CALCULATE` para criar um relacionamento "em tempo real" durante o cálculo.
* **Propósito:** Permite cruzar dados e criar métricas como a "Contagem de Alunos Únicos (SAE)", filtrando os participantes dos cursos com base em uma lista de referência externa, sem a necessidade de criar um relacionamento físico no modelo.

---

## 📄 Medidas Criadas (DAX)

### ✅ Total de Inscrições

Esta medida utiliza o relacionamento ativo por padrão, sendo um cálculo direto:

```
Total de Inscrições = COUNTROWS('LST_Usuarios-Cursos')
```

### ✅ Conclusões

Esta medida ativa o relacionamento inativo com Data_Conclusao e inclui "travas de segurança" para garantir que apenas registros válidos (com data preenchida e no passado) sejam contados, evitando dados "fantasma".

```
Total de Conclusões =   
CALCULATE(  
    COUNTROWS('LST_Usuarios-Cursos'),  
    'LST_Usuarios-Cursos'[StatusAluno] = "Concluído",  
    NOT(ISBLANK('LST_Usuarios-Cursos'[Data_Conclusao])),  
    'LST_Usuarios-Cursos'[Data_Conclusao] <= TODAY(),  
    USERELATIONSHIP(dCalendario[Date], 'LST_Usuarios-Cursos'[Data_Conclusao])  
)
```

## 🎛️ Interatividade e UX

### 🔹 Segmentadores de Dados (Slicers)

Utilizados para permitir filtros temporais hierárquicos:

- `dCalendario[Ano]`  
- `dCalendario[Semestre]`  
- `dCalendario[Quadrimestre]`

---

### 🔹 Navegação por Período com Marcadores (Bookmarks)

Para criar uma experiência de navegação fluida entre os recortes de tempo, foram utilizados **Marcadores** e **Botões**:

- **Marcadores Criados**: Visão Anual, Visão Semestral, Visão Quadrimestral  
- **Botões Configurados**: Cada botão ativa um marcador específico  
- **Painel de Seleção**: Usado para ocultar os slicers que não são relevantes em cada visão  
  *(ex: na "Visão Semestral", o slicer de Quadrimestre é ocultado)*

---

### 🔹 Título Dinâmico do Período

Para que o usuário saiba sempre qual período está sendo analisado, foi criada uma medida DAX que gera um título dinâmico:

```
PeriodoSelecionado =   
VAR AnoSelecionado = SELECTEDVALUE(dCalendario[Ano])  
VAR SemestreSelecionado = SELECTEDVALUE(dCalendario[Semestre])  
VAR QuadrimestreSelecionado = SELECTEDVALUE(dCalendario[Quadrimestre])  
RETURN  
    IF(  
        HASONEVALUE(dCalendario[Quadrimestre]), QuadrimestreSelecionado & " de " & AnoSelecionado,  
        IF(  
            HASONEVALUE(dCalendario[Semestre]), SemestreSelecionado & " de " & AnoSelecionado,  
            IF(  
                HASONEVALUE(dCalendario[Ano]), "Ano " & AnoSelecionado,  
                "Todo o Período"  
            )  
        )  
    )
```

### 📌 Aplicação

Esta medida é utilizada em um visual de **Cartão** para exibir o período atual selecionado no dashboard, permitindo que o usuário compreenda imediatamente o contexto temporal dos dados apresentados.

---

### ✅ Resultado Final

Um dashboard **limpo**, **flexível** e **inteligente**, com:

- ✅ Filtros temporais hierárquicos (Ano, Semestre, Quadrimestre)  
- ✅ Comparação visual entre inscrições e conclusões  
- ✅ Navegação intuitiva por período com uso de marcadores e botões  
- ✅ Título dinâmico que reflete o período selecionado  
- ✅ Interface adaptável e centrada na experiência do usuário

---

### 🖼️ Imagem do Dashboard

![Dashboard Power BI](Imagens/17.jpg)

---

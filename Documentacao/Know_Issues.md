## KNOW_ISSUES - Problemas Conhecidos e Suas Limitações

Este documento rastreia bugs conhecidos, limitações de arquitetura e potenciais problemas da solução atual.

---
## Classificação:
🔵 - Baixa Prioridade, será resolvido quando possível.

🟡 - Média Prioridade, será tratado nos proximos updates.

🔴 - Alta Prioridade, será tratado o mais rápido possível.

---
### Duplicata de Nomes (Script) 🔵
- **Problema:** Foi identificado um caso raro em que o script de limpeza do Excel `pode não detectar um nome duplicado` se ele contiver caracteres invisíveis ou formatações muito específicas.
- **Impacto:** Baixo. A lógica de verificação por e-mail (que é único) no fluxo do Power Automate serve como uma segunda camada de proteção contra a criação de usuários duplicados.

### Tratamento de Erros - Automação (Power Automate) 🟡
- **Problema:** O fluxo de ingestão principal foi construído para ser resiliente (continua mesmo que a busca no Teams falhe), mas não possui um `sistema avançado para registrar ou notificar` sobre cada linha individual do Excel que possa falhar por outros motivos (ex: uma lotação que não foi encontrada).
- **Impacto:** Médio. Uma execução pode terminar com sucesso, mas algumas linhas podem não ter sido processadas.
- **Solução Planejada:** Implementar uma ramificação de tratamento de erros que, em caso de falha em uma etapa crítica (como a busca de ID de Lotação), registre o erro em uma lista do SharePoint ou envie um e-mail de alerta para o administrador.

### Fluxo dos AJS-NS e Coordenadores 🔵
- **Problema:** O fluxo para ingestão da lista ainda não foi configurado em sua totalidade.
- **Impacto:** Baixo. Depende da origem dos dados. A ingestão inicial desses dados ainda é um processo manual.
- **Solução Planejada:** Desenvolver um fluxo que utilize o nome do usuário para buscar e validar o e-mail no Microsoft 365 antes de sincronizar.

### Interface Gráfica - Power Apps 🔵
- **Status:** ❌ NÃO RESOLVIDO - Porém, a `tela_inicial` e `tela_dashboard` ja estão refatorados para containers flexiveis, ainda são necessários ajustes, mas é um exemplo.
- **Problema:** A tela do aplicativo não é adaptavel para dispositivos móveis.
- **Impacto:** Em telas menores a unica forma de funcionalidade atual é utilizar na horiontal.
- **Solução Planejada:** Criar layout adaptativo com containers flexiveis, semelhante a `tela_inicial`.


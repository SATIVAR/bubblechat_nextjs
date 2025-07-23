# 🧩 Bubblechat Platform (Standalone, Sem Serviços Pagos)

Plataforma construída totalmente em **Next.js** (App Router + API Routes) para gerenciamento completo de um **Super Admin**, cadastro de **clientes**, configuração de **planos de licenças**, relatórios, ajustes de perfil e contextualização de **modelos de IA open‑source** ou via **Agno Framework** para uso interno dos clientes via script embedável.

---

## ⚙️ Tecnologias

* **Next.js** (App Router + API Routes)
* **Prisma ORM** + **SQLite** local (`db.sqlite`)
* **NextAuth.js** com **CredentialsProvider** + **PrismaAdapter**
* **Extractors de documentos**: PDF.js / pdf-parse, Tesseract.js, SheetJS
* **JWT** gerenciado pelo NextAuth para proteção de rotas
* **Agno Framework** (opcional) para orquestração de chamadas a múltiplos LLMs e pipelines de contexto

---

## 🔐 Autenticação e Super Admin

* **Único usuário** (Super Admin) definido em `.env`:

  ```env
  ADMIN_EMAIL=admin@bubblechat.com
  ADMIN_PASSWORD=adminSecure
  NEXTAUTH_SECRET=uma-senha-segura
  DATABASE_URL="file:./db.sqlite"
  ```
* **NextAuth** com **CredentialsProvider**:

  * Autoriza apenas credenciais que batam com `ADMIN_EMAIL` e `ADMIN_PASSWORD`.
  * Persiste sessões e usuários via **SQLite**.
* **Proteção de rotas** via `middleware.ts`, restringindo `/dashboard/**` ao Super Admin autenticado.

---

## 🏢 Funcionalidades do Super Admin

1. **Gerenciamento de Clientes**: CRUD de clientes (nome, domínio, script embedável, configurações específicas).
2. **Planos de Licença**: Definição de limites e recursos (Básico, Profissional, Enterprise).
3. **Relatórios**: Visualização de uso de documentos, logs de extração, estatísticas de atendimentos.
4. **Configurações Gerais**: Ajustes de sistema, variáveis de ambiente, seleção de modelos de IA por cliente.
5. **Perfil do Admin**: Atualização de dados pessoais e credenciais.
6. **Contextualização de Modelos IA**:

   * Fluxos internos que processam arquivos do cliente, extraem texto e injetam contexto em modelos IA.
   * Suporte a múltiplas opções:

     * **Modelos Open‑Source/Gratuitos** (Gemma 3, Llama, Mistral).
     * **Agno Framework** para orquestração de pipelines e balanceamento entre diferentes LLMs.
   * Cada cliente pode ter seu próprio pipeline e modelo configurado.

---

## 🌐 Widget Embedável (Cliente)

* Script JS para inserir no `<head>` ou `<footer>` do site do cliente.
* Carrega um componente React que abre um **widget de chat** protegido por token gerado para cada cliente.
* Funcionários autenticados localmente (dentro do sistema do cliente) interagem com o agente IA contextualizado.

---

## 📂 Fluxo de Extração e Orçamento

1. Funcionário envia **arquivo** (texto, PDF, imagem ou Excel) via widget.
2. Widget chama `/api/upload` (rota API Next.js) com o arquivo e token do cliente.
3. Backend aplica:

   * **PDF.js** / **pdf-parse** para extração de texto e tabelas de PDFs.
   * **Tesseract.js** para OCR de imagens.
   * **SheetJS** para parsing de planilhas.
4. Dados extraídos são enviados a `/api/context`, que:

   * Injeta essas informações no prompt do modelo IA configurado.
   * Se estiver usando **Agno Framework**, passa pelas etapas de orquestração e fallback entre modelos.
5. Agente IA processa e retorna orçamento, podendo ser:

   * **Modelo Open‑Source** direto.
   * **Pipeline Agno** que integra múltiplos LLMs ou lógicas customizadas.
6. Orçamento exibido no widget e **salvo em SQLite** para histórico e relatórios.

---

## 📁 Estrutura Simplificada

```
/prisma
  schema.prisma          # modelos: NextAuth, Client, Plan, History
/db.sqlite
/src
  /app
    /dashboard           # interface Super Admin
    /api
      auth/route.ts      # NextAuth
      upload.ts          # recebe arquivos
      extract.ts         # extrai com bibliotecas
      context.ts         # chama modelo IA ou Agno
  /lib
    prisma.ts            # inicializa cliente Prisma
    auth.ts              # config NextAuth
    models.ts            # configuração de modelos IA por cliente
    agno.ts              # helpers para integrar Agno Framework
  /components
    DashboardComponents
    ChatWidget.tsx
middleware.ts
next.config.js
.env
package.json
```

---

## 📌 Licenciamento

* **Básico**: 1 cliente, 500 docs/mês
* **Profissional**: 5 clientes, 5 k docs/mês
* **Enterprise**: Clientes ilimitados, docs ilimitados
* CRUD para planos de licença de uso.

*Segurança e tudo rodando local ou em VPS padrão. Sem custos extras.*

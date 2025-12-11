# API Cinema - Sistema de Locação de Filmes

API REST desenvolvida em Node.js + TypeScript para gerenciamento de filmes e sistema de locação com controle de estoque.

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior) - [Download aqui](https://nodejs.org/)
- **MySQL** (versão 8 ou superior) - [Download aqui](https://dev.mysql.com/downloads/)
- Um editor de código como **VS Code** - [Download aqui](https://code.visualstudio.com/)

## 🚀 Passo a Passo para Rodar o Projeto

### 1️⃣ Criar a pasta do projeto

```bash
mkdir api-cinema
cd api-cinema
```

### 2️⃣ Inicializar o projeto Node.js

```bash
npm init -y
```

Isso cria o arquivo `package.json` que gerencia as dependências do projeto.

### 3️⃣ Instalar TODAS as dependências de uma vez

```bash
npm install express typescript tsx knex mysql2 @types/express @types/node
```

**O que cada biblioteca faz:**

- **express** - Framework web para criar rotas e endpoints da API
- **typescript** - Adiciona tipagem estática ao JavaScript
- **tsx** - Executa arquivos TypeScript diretamente (sem precisar compilar)
- **knex** - Query builder SQL (facilita queries no banco de dados)
- **mysql2** - Driver para conectar ao MySQL
- **@types/express** - Tipagens do TypeScript para o Express
- **@types/node** - Tipagens do TypeScript para o Node.js

### 4️⃣ Configurar o TypeScript

Crie o arquivo de configuração:

```bash
npx tsc --init
```

Depois, abra o arquivo `tsconfig.json` e substitua o conteúdo por:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "ts-node": {
    "esm": true
  }
}
```

### 5️⃣ Configurar o banco de dados MySQL

1. Abra o MySQL Workbench ou terminal MySQL
2. Execute o arquivo `src/database/banco.sql` que está no projeto
3. Isso criará o banco `cinema_db` com todas as tabelas e dados de exemplo

**Ou execute manualmente:**

```sql
CREATE DATABASE cinema_db;
USE cinema_db;
-- Execute o resto do arquivo banco.sql
```

### 6️⃣ Configurar a conexão com o banco

Edite o arquivo `src/database/connection.ts` e ajuste suas credenciais do MySQL:

```typescript
import knex from "knex";

export const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "seu_usuario",      // ← Altere aqui
    password: "sua_senha",     // ← Altere aqui
    database: "cinema_db",
  },
});
```

### 7️⃣ Adicionar script de execução

Abra o `package.json` e adicione o script `dev`:

```json
{
  "name": "api_final",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx src/index.ts"
  },
  "dependencies": {
    // ... suas dependências
  }
}
```

### 8️⃣ Rodar o projeto

```bash
npm run dev
```

Se tudo estiver correto, você verá:

```
Servidor rodando na porta 3000 🚀
```

### 9️⃣ Testar a API

Você pode testar usando:
- **Navegador** (apenas GET): `http://localhost:3000/diretores`
- **Postman** - [Download aqui](https://www.postman.com/downloads/)
- **Insomnia** - [Download aqui](https://insomnia.rest/download)
- **Thunder Client** (extensão do VS Code)

## 📂 Estrutura do Projeto

```
api-cinema/
├── src/
│   ├── controllers/          # Lógica de negócio
│   │   ├── ator.controller.ts
│   │   ├── categoria.controller.ts
│   │   ├── diretor.controller.ts
│   │   ├── filme.controller.ts
│   │   ├── filmeAtor.controller.ts
│   │   └── locacao.controller.ts    # ⭐ Sistema de locação
│   ├── database/
│   │   ├── banco.sql         # Script SQL
│   │   └── connection.ts     # Configuração do banco
│   ├── routes/
│   │   └── router.ts         # Definição das rotas
│   └── index.ts              # Arquivo principal
├── package.json
├── tsconfig.json
└── readme.md
```

## 🔌 Endpoints da API

### 📌 Diretores
- `GET /diretores` - Lista todos
- `GET /diretores/:id` - Busca por ID
- `POST /diretores` - Cria novo
- `PUT /diretores/:id` - Atualiza
- `DELETE /diretores/:id` - Deleta

### 📌 Categorias
- `GET /categorias` - Lista todos
- `GET /categorias/:id` - Busca por ID
- `POST /categorias` - Cria novo
- `PUT /categorias/:id` - Atualiza
- `DELETE /categorias/:id` - Deleta

### 📌 Atores
- `GET /atores` - Lista todos
- `GET /atores/:id` - Busca por ID
- `POST /atores` - Cria novo
- `PUT /atores/:id` - Atualiza
- `DELETE /atores/:id` - Deleta

### 📌 Filmes
- `GET /filmes` - Lista todos (básico)
- `GET /filmes/:id` - Busca por ID
- `GET /filmes-completo` - Lista com INNER JOIN (diretor + categoria)
- `GET /filmes-completo/:id` - Busca com INNER JOIN
- `GET /filmes-com-atores` - Lista filmes com atores (INNER JOIN)
- `GET /filmes-com-atores/:id` - Busca filme com atores
- `POST /filmes` - Cria novo (precisa enviar `estoque`)
- `PUT /filmes/:id` - Atualiza
- `DELETE /filmes/:id` - Deleta

### 📌 Relacionamento Filme-Ator
- `GET /filme-atores` - Lista relações
- `POST /filme-atores` - Associa filme a ator
- `DELETE /filme-atores` - Remove associação

### ⭐ Locação (Lógica de Negócio)
- `GET /filmes-disponiveis` - Lista filmes com estoque > 0
- `GET /locacoes` - Lista todas as locações
- `GET /locacoes/:id` - Busca locação específica
- `POST /locacoes/alugar` - Aluga filme (diminui estoque)
- `PUT /locacoes/:id/devolver` - Devolve filme (aumenta estoque)

## 🧪 Exemplos de Uso

### Alugar um Filme

**POST** `http://localhost:3000/locacoes/alugar`

Body (JSON):
```json
{
  "id_filme": 1,
  "nome_cliente": "João Silva"
}
```

Resposta:
```json
{
  "id": 1,
  "message": "Filme alugado com sucesso",
  "estoque_restante": 4
}
```

### Devolver um Filme

**PUT** `http://localhost:3000/locacoes/1/devolver`

Resposta:
```json
{
  "message": "Filme devolvido com sucesso",
  "estoque_atual": 5
}
```

### Listar Filmes Disponíveis

**GET** `http://localhost:3000/filmes-disponiveis`

Resposta:
```json
[
  {
    "id": 1,
    "titulo": "A Origem",
    "ano": 2010,
    "estoque": 5,
    "diretor": "Christopher Nolan",
    "categoria": "Ficção Científica"
  }
]
```

## 📚 Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Superset do JavaScript com tipagem
- **Express** - Framework minimalista para APIs

### Banco de Dados
- **MySQL** - Sistema de gerenciamento de banco relacional
- **Knex.js** - Query builder SQL (escreve queries em JavaScript)

### Ferramentas de Desenvolvimento
- **tsx** - Executa TypeScript sem compilar (mais rápido para desenvolvimento)
- **@types/\*** - Definições de tipos para TypeScript

## 🎯 Conceitos Aplicados

✅ **CRUD Completo** - Create, Read, Update, Delete
✅ **INNER JOIN** - Consultas com múltiplas tabelas
✅ **Relacionamento N:N** - Filmes e Atores
✅ **Lógica de Negócio** - Sistema de locação com validações
✅ **Controle de Estoque** - Aumenta/diminui automaticamente
✅ **Validações** - Verificações antes de executar operações
✅ **Status e Timestamps** - Controle de datas e estados

## ❗ Problemas Comuns

### Erro: "Cannot find module"
- Verifique se instalou todas as dependências: `npm install`

### Erro: "ER_ACCESS_DENIED_ERROR"
- Credenciais do MySQL incorretas em `src/database/connection.ts`

### Erro: "ER_BAD_DB_ERROR"
- Banco de dados não foi criado. Execute o arquivo `banco.sql`

### Servidor não inicia
- Verifique se a porta 3000 não está em uso
- Tente mudar a porta em `src/index.ts`

### Erro de tipagem TypeScript
- Execute: `npm install @types/express @types/node`

## 📝 Licença

Projeto educacional - Senac

---

**Desenvolvido para fins didáticos** 🎓

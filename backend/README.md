# Brain Agriculture Backend

This is the backend API for the Brain Agriculture technical test. It is built with NestJS, TypeScript, TypeORM, and MySQL, following SOLID, Clean Code, and layered architecture principles.

## Features
- Cadastro, edição e exclusão de produtores rurais
- Validação de CPF ou CNPJ
- Validação de áreas (agricultável + vegetação <= total)
- Registro de várias culturas por fazenda

# Brain-AG Backend

Este é o backend do sistema Brain-AG, desenvolvido com NestJS, TypeORM e MySQL.

## Pré-requisitos
- Node.js (v18+ recomendado)
- MySQL server

## Instalação
1. **Instale as dependências:**
   ```cmd
   cd backend
   npm install
   ```
2. **Configure as variáveis de ambiente:**
   - Copie `.env.example` para `.env` e preencha com suas configurações do MySQL e URL do frontend:
     ```cmd
     copy .env.example .env
     ```
   - Edite o arquivo `.env` com suas credenciais do MySQL e URL do frontend.
3. **Crie o banco de dados:**
   - Use o arquivo SQL fornecido ou execute as migrations se disponível.
4. **Inicie o servidor backend:**
   ```cmd
   npm run start:dev
   ```
   A API estará disponível em `http://localhost:3005` por padrão.

## Comandos Úteis
- `npm run start:dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera build de produção
- `npm run lint` — Executa o lint

## Documentação da API
- Endpoints principais: `/produtor` (CRUD)
- CORS restrito à URL do frontend definida em `.env`

## Solução de Problemas
- Certifique-se de que o MySQL está rodando e as credenciais estão corretas em `.env`
- Se houver erros de dependência, execute `npm install` na pasta `backend`

---
## Testing
npm run test
npm run test:e2e
```

## Project Structure
- `src/produtor/` - Main feature module (entity, service, controller, repository)
- `src/app.module.ts` - Main application module

- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

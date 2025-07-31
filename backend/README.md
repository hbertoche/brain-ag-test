# Brain Agriculture Backend

This is the backend API for the Brain Agriculture technical test. It is built with NestJS, TypeScript, TypeORM, and MySQL, following SOLID, Clean Code, and layered architecture principles.

## Features
- Cadastro, edição e exclusão de produtores rurais
- Validação de CPF ou CNPJ
- Validação de áreas (agricultável + vegetação <= total)
- Registro de várias culturas por fazenda
- Dashboard de estatísticas
- API RESTful documentada

## Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- MySQL >= 8.x

## Setup
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd brain-ag-test/backend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   Create a `.env` file in the `backend` folder:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=root
   DB_NAME=brain_ag
   ```
   Make sure the MySQL database exists and credentials match.
4. **Run database migrations (if needed)**
   > For development, `synchronize: true` is enabled. For production, use migrations.
5. **Start the server**
   ```bash
   npm run start:dev
   ```
   The API will be available at `http://localhost:3000`.

## API Documentation
- Swagger UI: [http://localhost:3000/api](http://localhost:3000/api) (if enabled)

## Testing
```bash
npm run test
npm run test:e2e
```

## Project Structure
- `src/produtor/` - Main feature module (entity, service, controller, repository)
- `src/app.module.ts` - Main application module

## Useful Commands
- `npm run start:dev` - Start in development mode
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## License
MIT

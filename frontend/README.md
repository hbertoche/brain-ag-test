# Brain Agriculture Frontend

This is the frontend for the Brain Agriculture technical test. It is built with ReactJS, TypeScript, Redux Toolkit, Styled Components, and follows atomic design principles.

## Features
- Cadastro, edição e exclusão de produtores rurais
- Validação de CPF ou CNPJ
- Validação de áreas (agricultável + vegetação <= total)
- Registro de várias culturas por fazenda
- Dashboard com gráficos (Recharts)
- Estado global com Redux Toolkit
- Componentização com Atomic Design
- CSS-in-JS com Styled Components
- Testes com Jest e React Testing Library

## Prerequisites
- Node.js >= 18.x
- npm >= 9.x

## Setup
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd brain-ag-test/frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the app**
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure
- `src/components/atoms/` - Basic UI components (Button, Input)
- `src/components/molecules/` - Form components
- `src/components/organisms/` - Page-level components (Dashboard, ProdutorList)
- `src/store/` - Redux Toolkit slices and store
- `src/types/` - TypeScript types
- `src/hooks/` - Custom hooks (Redux)

## Testing
```bash
npm test
```

## License
MIT

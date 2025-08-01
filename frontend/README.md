
# Brain-AG Frontend

Este é o frontend do sistema Brain-AG, desenvolvido com React, Redux Toolkit, TypeScript e Styled Components, seguindo princípios de Atomic Design.

## Pré-requisitos
- Node.js (v18+ recomendado)
- npm (v9+ recomendado)

## Instalação
1. **Instale as dependências:**
   ```cmd
   cd frontend
   npm install
   ```
2. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na pasta `frontend` com a URL do backend:
     ```env
     REACT_APP_BACKEND_URL=http://localhost:3005
     ```
   - Ajuste a URL se o backend estiver rodando em outro endereço.
3. **Inicie a aplicação:**
   ```cmd
   npm start
   ```
   A aplicação estará disponível em `http://localhost:3000` por padrão.

## Funcionalidades
- Dashboard com estatísticas
- Cadastro, edição e exclusão de produtores rurais
- Validação de CPF ou CNPJ
- Validação de áreas (agricultável + vegetação <= total)
- Registro de várias culturas por fazenda
- Feedback de ações via popup
- Gráficos com Recharts
- Estado global com Redux Toolkit
- Componentização com Atomic Design
- CSS-in-JS com Styled Components
- Testes com Jest e React Testing Library

## Comandos Úteis
- `npm start` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera build de produção
- `npm run lint` — Executa o lint

## Estrutura do Projeto
- `src/components/atoms/` — Componentes básicos de UI (Button, Input)
- `src/components/molecules/` — Componentes de formulário
- `src/components/organisms/` — Componentes de página (Dashboard, ProdutorList)
- `src/store/` — Slices e store do Redux Toolkit
- `src/types/` — Tipos TypeScript
- `src/hooks/` — Hooks customizados (Redux)

## Solução de Problemas
- Certifique-se de que o backend está rodando e acessível na URL definida em `.env`
- Se houver erros de dependência, execute `npm install` na pasta `frontend`

---

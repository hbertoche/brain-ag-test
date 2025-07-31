import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { store } from './store/store';
import { Dashboard } from './components/organisms/Dashboard';
import { ProdutorForm } from './components/molecules/ProdutorForm';
import { ProdutorList } from './components/organisms/ProdutorList';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const Header = styled.header`
  background: #007bff;
  color: white;
  padding: 16px 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MainContent = styled.main`
  padding: 24px;
`;

function AppContent() {
  return (
    <AppContainer>
      <Header>
        <Nav>
          <h1>Brain Agriculture</h1>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/produtores">Produtores</NavLink>
          <NavLink to="/produtores/novo">Novo Produtor</NavLink>
        </Nav>
      </Header>
      
      <MainContent>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtores" element={<ProdutorList />} />
          <Route path="/produtores/novo" element={<ProdutorForm onSubmit={() => {}} onCancel={() => {}} />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { store } from './store/store';
import { Dashboard } from './components/organisms/Dashboard';
import { ProdutorForm } from './components/molecules/ProdutorForm';
import { ProdutorList } from './components/organisms/ProdutorList';
import { useAppDispatch } from './hooks/redux';
import { createProdutor, updateProdutor } from './store/produtorSlice';
import { useNavigate } from 'react-router-dom';
import { PopupMessage, PopupType } from './components/atoms/PopupMessage';
import { CreateProdutorDto, UpdateProdutorDto } from './types/produtor';

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [popup, setPopup] = useState<{ type: PopupType; message: string } | null>(null);

  const handleCreateProdutor = async (data: CreateProdutorDto) => {
    try {
      await dispatch(createProdutor(data)).unwrap();
      setPopup({ type: 'success', message: 'Produtor criado com sucesso!' });
      setTimeout(() => {
        setPopup(null);
        navigate('/produtor');
      }, 2000);
    } catch (error) {
      setPopup({ type: 'error', message: 'Erro ao criar produtor.' });
      setTimeout(() => setPopup(null), 3000);
    }
  };

  const handleUpdateProdutor = async (id: number, data: UpdateProdutorDto) => {
    try {
      await dispatch(updateProdutor({ id, produtor: data })).unwrap();
      setPopup({ type: 'success', message: 'Produtor atualizado com sucesso!' });
      setTimeout(() => {
        setPopup(null);
        navigate('/produtor');
      }, 2000);
    } catch (error) {
      setPopup({ type: 'error', message: 'Erro ao atualizar produtor.' });
      setTimeout(() => setPopup(null), 3000);
    }
  };

  return (
    <AppContainer>
      {popup && <PopupMessage type={popup.type} message={popup.message} />}
      <Header>
        <Nav>
          <h1>Brain Agriculture</h1>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/produtor">Produtores</NavLink>
          <NavLink to="/produtor/novo">Novo Produtor</NavLink>
        </Nav>
      </Header>
      <MainContent>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtor" element={<ProdutorList />} />
          <Route path="/produtor/novo" element={<ProdutorForm onSubmit={handleCreateProdutor} onCancel={() => navigate('/produtor')} />} />
          <Route path="/produtor/:id/editar" element={
            <ProdutorForm
              produtor={location.state?.produtor}
              onSubmit={(data) => handleUpdateProdutor(location.state?.produtor?.id, data)}
              onCancel={() => navigate('/produtor')}
            />
          } />
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

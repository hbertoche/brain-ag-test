import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProdutores, deleteProdutor } from '../../store/produtorSlice';
import { Button } from '../atoms/Button';
import { Produtor } from '../../types/produtor';

const ListContainer = styled.div`
  padding: 24px;
  background: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const ProdutorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`;

const ProdutorCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ProdutorName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
`;

const CPFCNPJ = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #333;
`;

const InfoValue = styled.span`
  color: #6c757d;
`;

const AreasSection = styled.div`
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  margin: 16px 0;
`;

const SafrasSection = styled.div`
  margin: 16px 0;
`;

const SafraTag = styled.span`
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
`;

const CulturasSection = styled.div`
  margin: 16px 0;
`;

const CulturaItem = styled.div`
  background: #e9ecef;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 48px;
  color: #6c757d;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 48px;
  color: #6c757d;
`;

export const ProdutorList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { produtores, loading } = useAppSelector(state => state.produtor);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProdutores());
  }, [dispatch]);

  const handleEdit = (produtor: Produtor) => {
    // Navigate to edit form (you can implement this later)
    console.log('Edit produtor:', produtor);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produtor?')) {
      setDeletingId(id);
      try {
        await dispatch(deleteProdutor(id)).unwrap();
      } catch (error) {
        console.error('Erro ao deletar produtor:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleNewProdutor = () => {
    navigate('/produtores/novo');
  };

  if (loading) {
    return (
      <ListContainer>
        <LoadingMessage>Carregando produtores...</LoadingMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <Header>
        <Title>Produtores Rurais</Title>
        <Button onClick={handleNewProdutor}>
          Novo Produtor
        </Button>
      </Header>

      {produtores.length === 0 ? (
        <EmptyMessage>
          <h3>Nenhum produtor cadastrado</h3>
          <p>Clique em "Novo Produtor" para começar.</p>
        </EmptyMessage>
      ) : (
        <ProdutorGrid>
          {produtores.map((produtor) => (
            <ProdutorCard key={produtor.id}>
              <CardHeader>
                <div>
                  <ProdutorName>{produtor.nomeProdutor}</ProdutorName>
                  <CPFCNPJ>{produtor.cpfCnpj}</CPFCNPJ>
                </div>
              </CardHeader>

              <InfoRow>
                <InfoLabel>Fazenda:</InfoLabel>
                <InfoValue>{produtor.nomeFazenda}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Localização:</InfoLabel>
                <InfoValue>{produtor.cidade} - {produtor.estado}</InfoValue>
              </InfoRow>

              <AreasSection>
                <InfoRow>
                  <InfoLabel>Área Total:</InfoLabel>
                  <InfoValue>{produtor.areaTotal} ha</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Área Agricultável:</InfoLabel>
                  <InfoValue>{produtor.areaAgricultavel} ha</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Área de Vegetação:</InfoLabel>
                  <InfoValue>{produtor.areaVegetacao} ha</InfoValue>
                </InfoRow>
              </AreasSection>

              {produtor.safras.length > 0 && (
                <SafrasSection>
                  <InfoLabel>Safras:</InfoLabel>
                  <div style={{ marginTop: '8px' }}>
                    {produtor.safras.map((safra, index) => (
                      <SafraTag key={index}>{safra}</SafraTag>
                    ))}
                  </div>
                </SafrasSection>
              )}

              {produtor.culturas.length > 0 && (
                <CulturasSection>
                  <InfoLabel>Culturas:</InfoLabel>
                  {produtor.culturas.map((cultura, index) => (
                    <CulturaItem key={index}>
                      {cultura.safra} - {cultura.cultura}
                    </CulturaItem>
                  ))}
                </CulturasSection>
              )}

              <Actions>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => handleEdit(produtor)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDelete(produtor.id!)}
                  disabled={deletingId === produtor.id}
                >
                  {deletingId === produtor.id ? 'Excluindo...' : 'Excluir'}
                </Button>
              </Actions>
            </ProdutorCard>
          ))}
        </ProdutorGrid>
      )}
    </ListContainer>
  );
}; 
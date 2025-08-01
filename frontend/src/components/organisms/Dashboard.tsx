import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/redux';

const DashboardContainer = styled.div`
  padding: 24px;
  background: #f8f9fa;
  min-height: 100vh;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const StatTitle = styled.h2`
  margin: 0 0 8px 0;
  color: #333;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #007bff;
`;

export const Dashboard: React.FC = () => {
  const { produtores } = useAppSelector(state => state.produtor);

  // Total de fazendas cadastradas
  const totalFazendas = produtores.length;

  // Total de hectares registrados
  const totalHectares = produtores.reduce((sum, p) => sum + (p.areaTotal || 0), 0);

  // Gráficos de pizza (dados)
  const estadoCount: Record<string, number> = {};
  const culturaCount: Record<string, number> = {};
  let totalAgricultavel = 0;
  let totalVegetacao = 0;

  produtores.forEach(p => {
    estadoCount[p.estado] = (estadoCount[p.estado] || 0) + 1;
    totalAgricultavel += p.areaAgricultavel || 0;
    totalVegetacao += p.areaVegetacao || 0;
    if (Array.isArray(p.culturas)) {
      p.culturas.forEach(c => {
        culturaCount[c.cultura] = (culturaCount[c.cultura] || 0) + 1;
      });
    }
  });

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <StatCard>
        <StatTitle>Total de Fazendas Cadastradas</StatTitle>
        <StatValue>{totalFazendas}</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Total de Hectares Registrados</StatTitle>
        <StatValue>{totalHectares} ha</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Por Estado</StatTitle>
        <ul>
          {Object.entries(estadoCount).map(([estado, count]) => (
            <li key={estado}>{estado}: {count}</li>
          ))}
        </ul>
      </StatCard>
      <StatCard>
        <StatTitle>Por Cultura Plantada</StatTitle>
        <ul>
          {Object.entries(culturaCount).map(([cultura, count]) => (
            <li key={cultura}>{cultura}: {count}</li>
          ))}
        </ul>
      </StatCard>
      <StatCard>
        <StatTitle>Por Uso do Solo</StatTitle>
        <ul>
          <li>Área Agricultável: {totalAgricultavel} ha</li>
          <li>Área de Vegetação: {totalVegetacao} ha</li>
        </ul>
      </StatCard>
    </DashboardContainer>
  );
};

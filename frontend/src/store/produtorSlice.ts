import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Produtor, CreateProdutorDto, UpdateProdutorDto, DashboardStats } from '../types/produtor';

// Mock data for development
const mockProdutores: Produtor[] = [
  {
    id: 1,
    cpfCnpj: '12345678901',
    nomeProdutor: 'João Silva',
    nomeFazenda: 'Fazenda São João',
    cidade: 'Campinas',
    estado: 'SP',
    areaTotal: 1000,
    areaAgricultavel: 800,
    areaVegetacao: 200,
    safras: ['Safra 2021', 'Safra 2022'],
    culturas: [
      { safra: 'Safra 2021', cultura: 'Soja' },
      { safra: 'Safra 2021', cultura: 'Milho' },
      { safra: 'Safra 2022', cultura: 'Café' }
    ]
  },
  {
    id: 2,
    cpfCnpj: '98765432100',
    nomeProdutor: 'Maria Santos',
    nomeFazenda: 'Sítio Boa Vista',
    cidade: 'Ribeirão Preto',
    estado: 'SP',
    areaTotal: 500,
    areaAgricultavel: 400,
    areaVegetacao: 100,
    safras: ['Safra 2022'],
    culturas: [
      { safra: 'Safra 2022', cultura: 'Cana-de-açúcar' }
    ]
  }
];

interface ProdutorState {
  produtores: Produtor[];
  loading: boolean;
  error: string | null;
  dashboardStats: DashboardStats | null;
}

const initialState: ProdutorState = {
  produtores: mockProdutores,
  loading: false,
  error: null,
  dashboardStats: null,
};

// Async thunks for API calls (using mock data for now)
export const fetchProdutores = createAsyncThunk(
  'produtor/fetchProdutores',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProdutores;
  }
);

export const createProdutor = createAsyncThunk(
  'produtor/createProdutor',
  async (produtor: CreateProdutorDto) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProdutor: Produtor = {
      ...produtor,
      id: Date.now(), // Mock ID generation
    };
    return newProdutor;
  }
);

export const updateProdutor = createAsyncThunk(
  'produtor/updateProdutor',
  async ({ id, produtor }: { id: number; produtor: UpdateProdutorDto }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id, ...produtor };
  }
);

export const deleteProdutor = createAsyncThunk(
  'produtor/deleteProdutor',
  async (id: number) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return id;
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'produtor/fetchDashboardStats',
  async (produtores: Produtor[]) => {
    // Calculate dashboard stats from produtores data
    const totalFazendas = produtores.length;
    const totalHectares = produtores.reduce((sum, p) => sum + p.areaTotal, 0);
    
    // Por estado
    const estadoCount = produtores.reduce((acc, p) => {
      acc[p.estado] = (acc[p.estado] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const porEstado = Object.entries(estadoCount).map(([estado, quantidade]) => ({
      estado,
      quantidade
    }));

    // Por cultura
    const culturaCount = produtores.reduce((acc, p) => {
      p.culturas.forEach(c => {
        acc[c.cultura] = (acc[c.cultura] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    const porCultura = Object.entries(culturaCount).map(([cultura, quantidade]) => ({
      cultura,
      quantidade
    }));

    // Por uso do solo
    const totalAgricultavel = produtores.reduce((sum, p) => sum + p.areaAgricultavel, 0);
    const totalVegetacao = produtores.reduce((sum, p) => sum + p.areaVegetacao, 0);
    const porUsoSolo = [
      { tipo: 'Área Agricultável', area: totalAgricultavel },
      { tipo: 'Área de Vegetação', area: totalVegetacao }
    ];

    return {
      totalFazendas,
      totalHectares,
      porEstado,
      porCultura,
      porUsoSolo
    };
  }
);

const produtorSlice = createSlice({
  name: 'produtor',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch produtores
      .addCase(fetchProdutores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProdutores.fulfilled, (state, action) => {
        state.loading = false;
        state.produtores = action.payload;
      })
      .addCase(fetchProdutores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar produtores';
      })
      // Create produtor
      .addCase(createProdutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProdutor.fulfilled, (state, action) => {
        state.loading = false;
        state.produtores.push(action.payload);
      })
      .addCase(createProdutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao criar produtor';
      })
      // Update produtor
      .addCase(updateProdutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProdutor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.produtores.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.produtores[index] = { ...state.produtores[index], ...action.payload };
        }
      })
      .addCase(updateProdutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao atualizar produtor';
      })
      // Delete produtor
      .addCase(deleteProdutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProdutor.fulfilled, (state, action) => {
        state.loading = false;
        state.produtores = state.produtores.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProdutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao deletar produtor';
      })
      // Dashboard stats
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboardStats = action.payload;
      });
  },
});

export const { clearError } = produtorSlice.actions;
export default produtorSlice.reducer; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Produtor, CreateProdutorDto, UpdateProdutorDto, DashboardStats } from '../types/produtor';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3005';

interface ProdutorState {
  produtores: Produtor[];
  loading: boolean;
  error: string | null;
  dashboardStats: DashboardStats | null;
}

const initialState: ProdutorState = {
  produtores: [],
  loading: false,
  error: null,
  dashboardStats: null,
};

export const fetchProdutores = createAsyncThunk(
  'produtor/fetchProdutores',
  async () => {
    const response = await fetch(`${API_URL}/produtor`);
    if (!response.ok) throw new Error('Erro ao buscar produtores');
    return await response.json();
  }
);

export const createProdutor = createAsyncThunk(
  'produtor/createProdutor',
  async (produtor: CreateProdutorDto) => {
    const response = await fetch(`${API_URL}/produtor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produtor),
    });
    if (!response.ok) throw new Error('Erro ao criar produtor');
    return await response.json();
  }
);

export const updateProdutor = createAsyncThunk(
  'produtor/updateProdutor',
  async ({ id, produtor }: { id: number; produtor: UpdateProdutorDto }) => {
    const response = await fetch(`${API_URL}/produtor/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produtor),
    });
    if (!response.ok) throw new Error('Erro ao atualizar produtor');
    return await response.json();
  }
);

export const deleteProdutor = createAsyncThunk(
  'produtor/deleteProdutor',
  async (id: number) => {
    const response = await fetch(`${API_URL}/produtor/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar produtor');
    return id;
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'produtor/fetchDashboardStats',
  async (_, { getState }) => {
    // Optionally, you can fetch stats from backend if available
    // For now, calculate from current state
    const state = getState() as { produtor: ProdutorState };
    const produtores = state.produtor.produtores;
    const totalFazendas = produtores.length;
    const totalHectares = produtores.reduce((sum, p) => sum + p.areaTotal, 0);
    const estadoCount = produtores.reduce((acc, p) => {
      acc[p.estado] = (acc[p.estado] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const porEstado = Object.entries(estadoCount).map(([estado, quantidade]) => ({ estado, quantidade }));
    const culturaCount = produtores.reduce((acc, p) => {
      p.culturas.forEach(c => {
        acc[c.cultura] = (acc[c.cultura] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    const porCultura = Object.entries(culturaCount).map(([cultura, quantidade]) => ({ cultura, quantidade }));
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
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboardStats = action.payload;
      });
  },
});

export const { clearError } = produtorSlice.actions;
export default produtorSlice.reducer;
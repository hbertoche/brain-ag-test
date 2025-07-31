import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { Produtor, CreateProdutorDto, Cultura } from '../../types/produtor';

interface ProdutorFormProps {
  produtor?: Produtor;
  onSubmit: (data: CreateProdutorDto) => void;
  onCancel: () => void;
  loading?: boolean;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 16px;
  margin-top: 16px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #333;
  font-size: 18px;
`;

const CulturaItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background: #c82333;
  }
`;

const validation = {
  cpfCnpj: (value: string) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length === 11) {
      // CPF validation
      return /^\d{11}$/.test(clean) ? '' : 'CPF inválido';
    } else if (clean.length === 14) {
      // CNPJ validation
      return /^\d{14}$/.test(clean) ? '' : 'CNPJ inválido';
    }
    return 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos';
  },
  areas: (agricultavel: number, vegetacao: number, total: number) => {
    if (agricultavel + vegetacao > total) {
      return 'A soma das áreas não pode exceder a área total';
    }
    return '';
  }
};

export const ProdutorForm: React.FC<ProdutorFormProps> = ({
  produtor,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<CreateProdutorDto>({
    cpfCnpj: '',
    nomeProdutor: '',
    nomeFazenda: '',
    cidade: '',
    estado: '',
    areaTotal: 0,
    areaAgricultavel: 0,
    areaVegetacao: 0,
    safras: [],
    culturas: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newSafra, setNewSafra] = useState('');
  const [newCultura, setNewCultura] = useState({ safra: '', cultura: '' });

  useEffect(() => {
    if (produtor) {
      setFormData({
        cpfCnpj: produtor.cpfCnpj,
        nomeProdutor: produtor.nomeProdutor,
        nomeFazenda: produtor.nomeFazenda,
        cidade: produtor.cidade,
        estado: produtor.estado,
        areaTotal: produtor.areaTotal,
        areaAgricultavel: produtor.areaAgricultavel,
        areaVegetacao: produtor.areaVegetacao,
        safras: [...produtor.safras],
        culturas: [...produtor.culturas],
      });
    }
  }, [produtor]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // CPF/CNPJ validation
    const cpfCnpjError = validation.cpfCnpj(formData.cpfCnpj);
    if (cpfCnpjError) newErrors.cpfCnpj = cpfCnpjError;

    // Required fields
    if (!formData.nomeProdutor) newErrors.nomeProdutor = 'Nome é obrigatório';
    if (!formData.nomeFazenda) newErrors.nomeFazenda = 'Nome da fazenda é obrigatório';
    if (!formData.cidade) newErrors.cidade = 'Cidade é obrigatória';
    if (!formData.estado) newErrors.estado = 'Estado é obrigatório';

    // Area validation
    const areaError = validation.areas(formData.areaAgricultavel, formData.areaVegetacao, formData.areaTotal);
    if (areaError) newErrors.areas = areaError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const addSafra = () => {
    if (newSafra && !formData.safras.includes(newSafra)) {
      setFormData(prev => ({
        ...prev,
        safras: [...prev.safras, newSafra]
      }));
      setNewSafra('');
    }
  };

  const removeSafra = (safra: string) => {
    setFormData(prev => ({
      ...prev,
      safras: prev.safras.filter(s => s !== safra),
      culturas: prev.culturas.filter(c => c.safra !== safra)
    }));
  };

  const addCultura = () => {
    if (newCultura.safra && newCultura.cultura) {
      setFormData(prev => ({
        ...prev,
        culturas: [...prev.culturas, { ...newCultura }]
      }));
      setNewCultura({ safra: '', cultura: '' });
    }
  };

  const removeCultura = (index: number) => {
    setFormData(prev => ({
      ...prev,
      culturas: prev.culturas.filter((_, i) => i !== index)
    }));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{produtor ? 'Editar Produtor' : 'Novo Produtor'}</h2>
      
      <Input
        label="CPF/CNPJ"
        value={formData.cpfCnpj}
        onChange={(value) => setFormData(prev => ({ ...prev, cpfCnpj: value }))}
        placeholder="000.000.000-00 ou 00.000.000/0000-00"
        error={errors.cpfCnpj}
        required
      />

      <FormRow>
        <Input
          label="Nome do Produtor"
          value={formData.nomeProdutor}
          onChange={(value) => setFormData(prev => ({ ...prev, nomeProdutor: value }))}
          placeholder="Nome completo"
          error={errors.nomeProdutor}
          required
        />
        <Input
          label="Nome da Fazenda"
          value={formData.nomeFazenda}
          onChange={(value) => setFormData(prev => ({ ...prev, nomeFazenda: value }))}
          placeholder="Nome da propriedade"
          error={errors.nomeFazenda}
          required
        />
      </FormRow>

      <FormRow>
        <Input
          label="Cidade"
          value={formData.cidade}
          onChange={(value) => setFormData(prev => ({ ...prev, cidade: value }))}
          placeholder="Cidade"
          error={errors.cidade}
          required
        />
        <Input
          label="Estado"
          value={formData.estado}
          onChange={(value) => setFormData(prev => ({ ...prev, estado: value }))}
          placeholder="UF"
          error={errors.estado}
          required
        />
      </FormRow>

      <FormSection>
        <SectionTitle>Áreas (hectares)</SectionTitle>
        <FormRow>
          <Input
            label="Área Total"
            type="number"
            value={formData.areaTotal.toString()}
            onChange={(value) => setFormData(prev => ({ ...prev, areaTotal: parseFloat(value) || 0 }))}
            placeholder="0"
            required
          />
          <Input
            label="Área Agricultável"
            type="number"
            value={formData.areaAgricultavel.toString()}
            onChange={(value) => setFormData(prev => ({ ...prev, areaAgricultavel: parseFloat(value) || 0 }))}
            placeholder="0"
            required
          />
        </FormRow>
        <Input
          label="Área de Vegetação"
          type="number"
          value={formData.areaVegetacao.toString()}
          onChange={(value) => setFormData(prev => ({ ...prev, areaVegetacao: parseFloat(value) || 0 }))}
          placeholder="0"
          required
        />
        {errors.areas && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.areas}</span>}
      </FormSection>

      <FormSection>
        <SectionTitle>Safras</SectionTitle>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <Input
            value={newSafra}
            onChange={setNewSafra}
            placeholder="Ex: Safra 2023"
          />
          <Button type="button" onClick={addSafra} size="small">
            Adicionar
          </Button>
        </div>
        {formData.safras.map((safra, index) => (
          <CulturaItem key={index}>
            <span>{safra}</span>
            <RemoveButton type="button" onClick={() => removeSafra(safra)}>
              Remover
            </RemoveButton>
          </CulturaItem>
        ))}
      </FormSection>

      <FormSection>
        <SectionTitle>Culturas</SectionTitle>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <select
            value={newCultura.safra}
            onChange={(e) => setNewCultura(prev => ({ ...prev, safra: e.target.value }))}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">Selecione a safra</option>
            {formData.safras.map((safra, index) => (
              <option key={index} value={safra}>{safra}</option>
            ))}
          </select>
          <Input
            value={newCultura.cultura}
            onChange={(value) => setNewCultura(prev => ({ ...prev, cultura: value }))}
            placeholder="Nome da cultura"
          />
          <Button type="button" onClick={addCultura} size="small">
            Adicionar
          </Button>
        </div>
        {formData.culturas.map((cultura, index) => (
          <CulturaItem key={index}>
            <span>{cultura.safra} - {cultura.cultura}</span>
            <RemoveButton type="button" onClick={() => removeCultura(index)}>
              Remover
            </RemoveButton>
          </CulturaItem>
        ))}
      </FormSection>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : (produtor ? 'Atualizar' : 'Criar')}
        </Button>
      </div>
    </FormContainer>
  );
}; 
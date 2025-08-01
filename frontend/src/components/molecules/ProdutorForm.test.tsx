import { render, screen, fireEvent } from '@testing-library/react';
import { ProdutorForm } from './ProdutorForm';

describe('ProdutorForm', () => {
  it('renders form fields', () => {
    render(<ProdutorForm onSubmit={jest.fn()} onCancel={jest.fn()} />);
    expect(screen.getByText(/CPF\/CNPJ/i)).toBeInTheDocument();
    expect(screen.getByText(/Nome do Produtor/i)).toBeInTheDocument();
    expect(screen.getByText(/Nome da Fazenda/i)).toBeInTheDocument();
    expect(screen.getByText(/Cidade/i)).toBeInTheDocument();
    expect(screen.getByText(/Estado/i)).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', () => {
    const onSubmit = jest.fn();
    render(<ProdutorForm onSubmit={onSubmit} onCancel={jest.fn()} />);
    // Fill required fields
    fireEvent.change(screen.getByPlaceholderText('000.000.000-00 ou 00.000.000/0000-00'), { target: { value: '12345678901' } });
    fireEvent.change(screen.getByPlaceholderText('Nome completo'), { target: { value: 'Teste' } });
    fireEvent.change(screen.getByPlaceholderText('Nome da propriedade'), { target: { value: 'Fazenda' } });
    fireEvent.change(screen.getByPlaceholderText('Cidade'), { target: { value: 'Cidade' } });
    fireEvent.change(screen.getByPlaceholderText('UF'), { target: { value: 'SP' } });
    fireEvent.change(screen.getAllByPlaceholderText('0')[0], { target: { value: '100' } });
    fireEvent.change(screen.getAllByPlaceholderText('0')[1], { target: { value: '60' } });
    fireEvent.change(screen.getAllByPlaceholderText('0')[2], { target: { value: '30' } });
    // Add a safra
    fireEvent.change(screen.getByPlaceholderText('Ex: Safra 2023'), { target: { value: 'Safra 2025' } });
    fireEvent.click(screen.getAllByText('Adicionar')[0]);
    // Add a cultura
    fireEvent.change(screen.getByPlaceholderText('Nome da cultura'), { target: { value: 'Soja' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Safra 2025' } });
    fireEvent.click(screen.getAllByText('Adicionar')[1]);
    // Submit
    fireEvent.submit(screen.getByTestId('produtor-form'));
    expect(onSubmit).toHaveBeenCalled();
  });
});

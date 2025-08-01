describe('Produtor CRUD', () => {
  it('should create a new produtor', () => {
    cy.visit('/');
    cy.contains('Novo Produtor').click();
    const cpf = Array.from({length: 11}, () => Math.floor(Math.random() * 10)).join('');
    cy.get('input[placeholder="000.000.000-00 ou 00.000.000/0000-00"]').type(cpf);
    cy.get('input[placeholder="Nome completo"]').type('Produtor Teste');
    cy.get('input[placeholder="Nome da propriedade"]').type('Fazenda Teste');
    cy.get('input[placeholder="Cidade"]').type('Cidade Teste');
    cy.get('input[placeholder="UF"]').type('SP');
    cy.get('input[placeholder="0"]').eq(0).type('100');
    cy.get('input[placeholder="0"]').eq(1).type('60');
    cy.get('input[placeholder="0"]').eq(2).type('30');
    // Adiciona uma safra
    cy.get('input[placeholder="Ex: Safra 2023"]').type('Safra 2025');
    cy.get('button').contains('Adicionar').first().click();
    // Adiciona uma cultura
    cy.get('select').select('Safra 2025');
    cy.get('input[placeholder="Nome da cultura"]').type('Soja');
    cy.get('button').contains('Adicionar').last().click();
    cy.get('button').contains('Criar').click();
    cy.contains('Produtor criado com sucesso!').should('exist');
  });

  it('should show validation error if area is invalid', () => {
    cy.visit('/');
    cy.contains('Novo Produtor').click();
    cy.get('input[placeholder="000.000.000-00 ou 00.000.000/0000-00"]').type('12345678901');
    cy.get('input[placeholder="Nome completo"]').type('Produtor Teste');
    cy.get('input[placeholder="Nome da propriedade"]').type('Fazenda Teste');
    cy.get('input[placeholder="Cidade"]').type('Cidade Teste');
    cy.get('input[placeholder="UF"]').type('SP');
    cy.get('input[placeholder="0"]').eq(0).type('100');
    cy.get('input[placeholder="0"]').eq(1).type('80');
    cy.get('input[placeholder="0"]').eq(2).type('30');
    cy.get('button').contains('Criar').click();
    cy.contains('A soma das áreas não pode exceder a área total').should('exist');
  });
});

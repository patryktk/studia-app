describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('#username').type('Patryk')
    cy.get('#password').type('pass')
    cy.get('#loginButton').click()
  })
  it('Przycisk nawigacyjny logout',() => {
    cy.contains('Logout').click()
    cy.url().should('include','/login')
  })
  it('Przechodzi na stronę logowania i się loguje', () => {
    cy.url().should('include','/welcome/Patryk')
  })
  it('Przechodzi do listy Todo za pomocą linku', () =>{
    cy.contains('Go here').click()
    cy.url().should('include','/todos')
  })
  it('Przechodzi do listy Todo za pomocą przycisku nawigacyjnego Todo', () =>{
    cy.contains('Go here').click()
    cy.url().should('include','/todos')
  })
  it('Sprawdzenie przycisku nawigacyjnego Home', () =>{
    cy.contains('Go here').click()
    cy.contains('Home').click()
    cy.url().should('include','/welcome/Patryk')
  })
  it('Niepomyślne dodanie nowego Todo [walidacja]', () =>{
    cy.contains('Go here').click()
    cy.get('#addNewTodoButton').click()
    cy.get('#descriptionField').type('Op')
    cy.get('#saveTodoButton').click()
    cy.get('#errorMessageDescription').contains("Enter at least 5 characters")
    cy.get('#errorMessageTargetDate').contains("Enter a target date")
  })

  it('Pomyślne dodanie nowego Todo', () =>{
    cy.contains('Go here').click()
    cy.get('#addNewTodoButton').click()
    cy.get('#descriptionField').type('Opis zadania')
    cy.get('#dateField').type('2023-11-24')
    cy.get('#isDoneField').click()
    cy.get('#saveTodoButton').click()
    cy.get('table tbody tr').contains('td', 'Opis zadania').parent('tr').within(() => {
      cy.get('td').eq(2).should('have.text', '2023-11-24');
    });
  })
  it("Edycja Todo",() => {
    cy.contains('Go here').click()
    cy.get('table tbody tr').contains('td', 'Opis zadania').parent('tr').within(() => {
      cy.get('td').eq(4).click();
    });
    cy.get('#descriptionField').clear()
    cy.get('#descriptionField').type('Update opis')
    cy.get('#isDoneField').click()
    cy.get('#saveTodoButton').click()
    cy.get('table tbody tr').contains('td', 'Update opis').parent('tr').within(() => {
      cy.get('td').eq(1).should('have.text', 'false');
    });
  })
  it('Usunięcie Todo',() =>{
    cy.contains('Go here').click()
    cy.get('table tbody tr').contains('td', 'Update opis').parent('tr').within(() => {
      cy.get('td').eq(3).click();
    });
    cy.get("#deleteMessage").contains('Delete todo: Update opis')
  })
})
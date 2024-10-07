describe("Item CRUD operations", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Crear nuevo item", () => {
    cy.get('input[id="name"]').type("New Test Item");
    cy.get('textarea[id="description"]').type("This is a test item");
    cy.get('button[type="submit"]').click();

    cy.contains("New Test Item").should("be.visible");
    cy.contains("This is a test item").should("be.visible");
  });

  it("Puede leer items existentes", () => {
    // Asumiendo que ya hay items en la lista
    cy.get('[data-testid="item-list"]')
      .children()
      .should("have.length.at.least", 1);
  });

  it("Puede actualizar items existentes", () => {
    cy.get('[data-testid="item-list"]').children().first().as("firstItem");
    cy.get("@firstItem").find('[data-testid="edit-button"]').click();

    cy.get('input[id="name"]').clear().type("Updated Item Name");
    cy.get('textarea[id="description"]')
      .clear()
      .type("Updated item description");
    cy.get('button[type="submit"]').click();

    cy.contains("Updated Item Name").should("be.visible");
    cy.contains("Updated item description").should("be.visible");
  });

  it("Puede borrar un item", () => {
    // Selecciona el primer ítem de la lista
    cy.get('[data-testid="item-list"]').children().first().as("firstItem");

    // Obtén el data-testid del primer ítem
    cy.get("@firstItem")
      .invoke("attr", "data-testid")
      .then((firstItemTestId) => {
        // Haz clic en el botón de borrar del primer ítem
        cy.get(`[data-testid="${firstItemTestId}"]`)
          .find('[data-testid="delete-button"]')
          .click();

        // Verifica que el ítem haya sido eliminado
        cy.get(`[data-testid="${firstItemTestId}"]`).should("not.exist");
      });
  });
});

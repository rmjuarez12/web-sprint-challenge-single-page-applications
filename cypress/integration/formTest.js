describe("Signup Form Tests", function () {
  // Visit the page of the form
  beforeEach(() => {
    cy.visit("/pizza");
  });

  it("Fill Out Form", function () {
    // Check the name field
    cy.get("[data-cy=name]")
      .type("Richard Rodriguez")
      .should(($input) => {
        const val = $input.val();

        // Check to see if the value typed equals to the value of the field
        expect(val).to.match(/Richard Rodriguez/);

        // Check to see if the value typed does NOT contain numbers
        expect(val).to.not.match(/[0-9]/);

        // Check to see if the value of the field is at least 1 character long
        expect(val).to.have.length.of.at.least(1);
      });

    // Go to the new route
    cy.get(".pizza-size legend a").click();

    // Check the size field
    cy.get("[data-cy=size]").select("Medium").should('have.value', 'Medium');
    
    // Go to the new route
    cy.get(".checkboxes legend a").click();

    // Check the toppings checkbox
    cy.get("[data-cy=pepperoni]").click().should('be.checked');
    cy.get("[data-cy=sausage]").click().should('be.checked');
    cy.get("[data-cy=ham]").click().should('be.checked');
    cy.get("[data-cy=onion]").click().should('be.checked');

    // Go to the new route
    cy.get(".pizza-substitute legend a").click();

    // Check if the toggle btn works
    cy.get(".pizza-substitute .toggle-field").click();

    // Go to the new route
    cy.get(".pizza-extra legend a").click();

    // Check the instructions field
    cy.get("[data-cy=instructions]")
      .type("I have some very special instructions")
      .should('have.value', 'I have some very special instructions');

    // Check the submission
    // Check the terms field
    cy.get("[data-cy=submit]").click();

    // Check if the form properly submitted and returned a value output
    cy.get("pre").should("exist");

    // Check if the form cleared
    cy.get("#pizza-form form")
      .children()
      .should(($input) => {
        const val = $input.val();

        // Check to see if the value of the field is at least 1 character long
        expect(val.length).to.be.lessThan(1);
      });


  });
});
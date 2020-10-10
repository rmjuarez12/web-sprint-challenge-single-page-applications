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
    
    // Check the toppings checkbox
    cy.get("[data-cy=pepperoni]").click().should('be.checked');
    cy.get("[data-cy=sausage]").click().should('be.checked');
    cy.get("[data-cy=ham]").click().should('be.checked');
    cy.get("[data-cy=onion]").click().should('be.checked');

    // Check the instructions field
    cy.get("[data-cy=instructions]")
      .type("I have some very special instructions")
      .should('have.value', 'I have some very special instructions');

    // Check the email field
    // cy.get("[data-cy=email]")
    //   .type("rmjuarez12@gmail.com")
    //   .should(($input) => {
    //     const val = $input.val();

    //     // Check to see if the value typed equals to the value of the field
    //     expect(val).to.match(/rmjuarez12@gmail.com/);

    //     // Check to see if the value of the field is at least 1 character long
    //     expect(val).to.have.length.of.at.least(1);

    //     // Check if the email is an actual email by checking if it has an "@"
    //     expect(val).to.include("@");
    //   });

  });
});
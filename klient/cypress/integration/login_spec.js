describe("login_and_logout", () => {
  it("patient can login and logout", () => {
    cy.visit("localhost:3000/login");
    cy.findByRole("textbox").type("Patient");
    cy.findByPlaceholderText(/wprowadź hasło/i).type("Patient");
    cy.findByRole("button", {
      name: /zaloguj/i,
    }).click();
    cy.contains("Strona główna pacjenta");
    cy.wait(2000);
    cy.findByRole("button", {
      name: /wyloguj/i,
    }).click();
  });
});

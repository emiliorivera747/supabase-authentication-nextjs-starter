describe("Password Reset Page", () => {
  const baseUrl = Cypress.env("NEXT_PUBLIC_DOMAIN");

  beforeEach(() => {
    cy.visit(`${baseUrl}/login-help`);
  });

  it("should display the password reset form", () => {
    cy.get("form").should("exist");
    cy.get("input#email").should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("should show success message for valid email", () => {
    cy.get("input#email").type("emiliorivera174@gmail.com");
    cy.get('button[type="submit"]').click();
    cy.get(".success-message").should("contain", "Email sent successfully!");
  });

  it("should show error message for non-existent email", () => {
    cy.get("input#email").type("nonexistent.email@example.com");
    cy.get('button[type="submit"]').click();
    cy.get(".primary-error-message").should("contain", "User not found");
  });

  it("should navigate to sign-in page after email is sent", () => {
    cy.get("input#email").type("emiliorivera174@gmail.com");
    cy.get('button[type="submit"]').click();
    cy.get("a[href='/sign-in']").click();
    cy.url().should("include", "/sign-in");
  });
});

describe("Password Reset Page", () => {
  const baseUrl = Cypress.env("NEXT_PUBLIC_DOMAIN");

  beforeEach(() => {
    cy.visit(`${baseUrl}/reset-password`);
  });

  it("should display the password reset form", () => {
    cy.get("form").should("exist");
    cy.get("input#password-input").should("exist");
    cy.get("body").click(0, 0); // Click outside to clear tooltip
    cy.get('button[type="submit"]').should("exist");
  });

  it("should show error message for password less than 8 characters", () => {
    cy.get("input#password-input").type("Short1!");
    cy.get("body").click(0, 0); // Click outside to clear tooltip
    cy.get('button[type="submit"]').click();
    cy.get(".input-error").should(
      "contain",
      "Password must be at least 8 characters long"
    );
  });

  it("should show error message for password without a number", () => {
    cy.get("input#password-input").type("NoNumber!");
    cy.get("body").click(0, 0); // Click outside to clear tooltip
    cy.get('button[type="submit"]').click();
    cy.get(".input-error").should(
      "contain",
      "Password must contain at least one number"
    );
  });

  it("should show error message for password without a lowercase letter", () => {
    cy.get("input#password-input").type("NOLOWERCASE1!");
    cy.get("body").click(0, 0); // Click outside to clear tooltip
    cy.get('button[type="submit"]').click();
    cy.get(".input-error").should(
      "contain",
      "Password must contain at least one lowercase letter"
    );
  });

  it("should show error message for password without an uppercase letter", () => {
    cy.get("input#password-input").type("nouppercase1!");
    cy.get("body").click(0, 0); // Click outside to clear tooltip
    cy.get('button[type="submit"]').click();
    cy.get(".input-error").should(
      "contain",
      "Password must contain at least one uppercase letter"
    );
  });

  it("should show error message for password without a special character", () => {
    cy.get("input#password-input").type("NoSpecialChar1");
    cy.get("body").click(0, 0); // Click outside to clear tooltip
    cy.get('button[type="submit"]').click();
    cy.get(".input-error").should(
      "contain",
      "Password must contain at least one special character"
    );
  });

});

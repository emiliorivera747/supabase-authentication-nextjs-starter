
describe("Sign In Schema Validation", () => {
  const baseUrl = Cypress.env("NEXT_PUBLIC_DOMAIN");

  it("should show error for email local part longer than 63 characters", () => {
    const longLocalPartEmail = "a".repeat(64) + "@example.com";
    cy.visit(`${baseUrl}/sign-up`);

    cy.get("input#email1").type(longLocalPartEmail);
    cy.get("input#password-input").type("ValidPassword123!");
    cy.get("body").click(0, 0); // Click outside to clear tooltip

    cy.get('button[type="submit"]').click();

    cy.get(".input-error").and(
      "contain",
      "Email local part cannot be longer than 63 characters"
    );
  });

  it("should show error for password shorter than 8 characters", () => {
    cy.visit(`${baseUrl}/sign-up`);

    cy.get("input#email1").type("valid.email@example.com");
    cy.get("input#password-input").type("hort!1S");
    cy.get("body").click(0, 0); // Click outside to clear tooltip

    cy.get('button[type="submit"]').click();

    cy.get(".input-error").and(
      "contain",
      "Password must be at least 8 characters long"
    );
  });

  it("should show error for password without a number", () => {
    cy.visit(`${baseUrl}/sign-up`);

    cy.get("input#email1").type("valid.email@example.com");
    cy.get("input#password-input").type("NoNumber!");
    cy.get("body").click(0, 0); // Click outside to clear tooltip

    cy.get('button[type="submit"]').click();

    cy.get(".input-error").and(
      "contain",
      "Password must contain at least one number"
    );
  });

  it("should show error for password without a lowercase letter", () => {
    cy.visit(`${baseUrl}/sign-up`);

    cy.get("input#email1").type("valid.email@example.com");
    cy.get("input#password-input").type("NOLOWERCASE1!");
    cy.get("body").click(0, 0); // Click outside to clear tooltip

    cy.get('button[type="submit"]').click();

    cy.get(".input-error").and(
      "contain",
      "Password must contain at least one lowercase letter"
    );
  });

  it("should show error for password without an uppercase letter", () => {
    cy.visit(`${baseUrl}/sign-up`);

    cy.get("input#email1").type("valid.email@example.com");
    cy.get("input#password-input").type("nouppercase1!");
    cy.get("body").click(0, 0); // Click outside to clear tooltip

    cy.get('button[type="submit"]').click();

    cy.get(".input-error").and(
      "contain",
      "Password must contain at least one uppercase letter"
    );
  });

  it("should show error for password without a special character", () => {
    cy.visit(`${baseUrl}/sign-up`);

    cy.get("input#email1").type("valid.email@example.com");
    cy.get("input#password-input").type("NoSpecialChar1");
    cy.get("body").click(0, 0); // Click outside to clear tooltip

    cy.get('button[type="submit"]').click();

    cy.get(".input-error").and(
      "contain",
      "Password must contain at least one special character"
    );
  });
});

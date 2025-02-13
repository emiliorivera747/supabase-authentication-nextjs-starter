describe("Sign In Flow", () => {
  it("should successfully sign in with valid credentials", () => {
    const baseUrl = Cypress.env("NEXT_PUBLIC_DOMAIN");
    cy.visit(`${baseUrl}/sign-in`);

    cy.get("input#email").type("emiliorivera174@gmail.com");
    cy.get("input#password2").type("Soccer3131299!");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
    cy.get(".Toastify__toast--success").should(
      "contain",
      "Signed in successfully!"
    );
  });

  it("should show error message with invalid credentials", () => {
    const baseUrl = Cypress.env("NEXT_PUBLIC_DOMAIN");

    cy.visit(`${baseUrl}/sign-in`);

    cy.get("input#email").type("invaliduser@example.com");
    cy.get("input#password2").type("wrongpassword");

    cy.get('button[type="submit"]').click();

    cy.get(".bg-red-100")
      .should("be.visible")
      .and("contain", "Invalid email or password");
  });
});

describe("Sign In Schema Validation", () => {
  const baseUrl = Cypress.env("NEXT_PUBLIC_DOMAIN");

  it("Should show errro for local part cannot be longer than 63 characters", () => {
    const longEmail = "a".repeat(253) + "@example.com";
    cy.visit(`${baseUrl}/sign-in`);

    cy.get("input#email").type(longEmail);
    cy.get("input#password2").type("validPassword123!");

    cy.get('button[type="submit"]').click();

    cy.get(".input-error").and(
      "contain",
      "Email local part cannot be longer than 63 characters"
    );
  });

  it("should show error for email local part longer than 63 characters", () => {
    const longLocalPartEmail = "a".repeat(64) + "@example.com";
    cy.visit(`${baseUrl}/sign-in`);

    cy.get("input#email").type(longLocalPartEmail);
    cy.get("input#password2").type("validPassword123!");

    cy.get('button[type="submit"]').click();

    cy.get(".input-error").and(
      "contain",
      "Email local part cannot be longer than 63 characters"
    );
  });

  it("should show error for password shorter than 8 characters", () => {
    cy.visit(`${baseUrl}/sign-in`);

    cy.get("input#email").type("valid.email@example.com");
    cy.get("input#password2").type("short");

    cy.get('button[type="submit"]').click();

    cy.get(".input-error").and(
      "contain",
      "Password must be at least 8 characters"
    );
  });
});

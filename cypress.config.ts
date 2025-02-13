import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
  env: {
    NEXT_PUBLIC_DOMAIN: "http://localhost:3000",
  },
});

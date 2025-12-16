## Supabase and Next.js starter
If you're looking to get started with Vite and Node.js, you've come to the right place! Feel free to clone the repository and start building your new project.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io/) (install globally with `npm install -g pnpm`)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/emiliorivera747/supabase-authentication-nextjs-starter.git
   ```
   ```bash
   cd supabase-authentication-nextjs-starter/
   ```

2. **Install project dependencies**:
   ```bash
   pnpm i
   ```

3. **Rename example.env to file and add keys**:
    You can get your Supabase keys from the API settings page within your project's dashboard on the [Supabase website](https://supabase.com/dashboard/sign-in?returnTo=%2Forg)
    ```bash
    NEXT_PUBLIC_SUPABASE_URL='<Public Supabase URL>'
    NEXT_PUBLIC_SUPABASE_ANON_KEY='<Supabase Anon Key>'
    NEXT_SUPABASE_SERVICE_ROLE=<Service Role Key>
    DATABASE_URL="<Connection String>"
    ```

4. **Generate Schemas**:
   ```bash
   pnpm prisma migrate dev
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

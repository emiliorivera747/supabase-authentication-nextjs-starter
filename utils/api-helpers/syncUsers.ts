import { prisma } from "@/lib/prisma";
import { fetchAllSupabaseUsers } from "@/utils/api-helpers/fetchAllSupabaseUsers";

export async function syncUsers() {
  const supabase = await fetchAllSupabaseUsers();

  for (const supabaseUser of supabase) {
    const existingUser = await prisma.user.findUnique({
      where: { user_id: supabaseUser.id },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: supabaseUser.email? supabaseUser.email : "none",
          user_id: supabaseUser.id,
        },
      });
    }
  }
}

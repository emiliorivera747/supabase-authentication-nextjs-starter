import { createClient } from "@/utils/supabase/client";

export async function fetchAllSupabaseUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching Supabase users:", error);
    throw new Error("Failed to fetch users");
  }

  return data.users;
}

import { createClient } from "@/utils/supabase/server"; 
import { NextResponse } from "next/server";

export async function authenticateUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  return user;
}

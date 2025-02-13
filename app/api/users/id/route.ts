import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";
import { createClient } from "@/utils/supabase/server";

const userDoesNotExist = () =>
  NextResponse.json(
    { status: "error", message: "User does not exist" },
    { status: 404 }
  );

const userNotDeleted = () =>
  NextResponse.json(
    { status: "error", message: "User not deleted" },
    { status: 500 }
  );

/**
 * Get a user by id
 *
 *
 * @route GET /api/users/id
 * @desc Get a user by id
 * @access Private
 */
export async function GET() {
  try {
    const result = await authenticateUser();
    if (result instanceof NextResponse) return result;
    const userId = result?.id;
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    // Your protected logic here
    return NextResponse.json(
      { message: "Protected data", user },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Token verification failed", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

/**
 * Delete a user by id
 *
 * @route DELETE /api/users/id
 * @desc Delete a user by id
 * @access Private
 */
export async function DELETE() {
  try {
    const supabase = await createClient();

    /**
     * Is the user authenticated?
     */
    const result = await authenticateUser();
    if (result instanceof NextResponse) return result;
    const id = result?.id;

    /**
     * Does the user exist?
     */
    const user = await prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });

    if (!user) return userDoesNotExist();

    /**
     * Delete the user from Supabase
     */
    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) return userNotDeleted();

    /**
     * Delete the user from Postgres
     */
    const deletedUser = await prisma.user.delete({ where: { user_id: id } });
    if (!deletedUser) return userNotDeleted();

    return NextResponse.json(
      { status: "success", message: "User deleted" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Server Error", error: err, status: "error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { authenticateUser } from "@/utils/api-helpers/authenticateUser";
import crypto from "crypto";
import { headers } from "next/headers";
/**
 *
 * @route POST /api/users
 * @desc Register a new user
 * @access Public
 */
export async function DELETE(req: Request) {
  try {
    const headersList = await headers();
    const secret = headersList.get("x-supabase-secret");
    const timestamp = headersList.get("x-supabase-timestamp");
    console.log("secret", secret);
    console.log("timestamp", timestamp);

    // // Ensure timestamp is recent
    if (!timestamp) {
      return NextResponse.json({ error: "Timestamp missing" }, { status: 400 });
    }
    const timestampInt = parseInt(timestamp);
    const now = Date.now();
    if (now - timestampInt > 60000) {
      // 1 minute tolerance
      return NextResponse.json({ error: "Timestamp expired" }, { status: 400 });
    }


    /**
     * Creates a HMAC object with the SHA256 algorithm using the private key
     */
    const hmac = crypto.createHmac("sha256", process.env.PRIVATE_SUPABASE_KEY || "");
    console.log("HMAC", hmac);

    /**
     * Updates the HMAC object with the data to be hashed
     */
    const body = await req.text();
    hmac.update(`${timestamp}${body}`);
    const calculatedSignature = hmac.digest('hex');
    console.log("calculatedSignature", calculatedSignature);

    // Check if x-supabase-secret matches our PRIVATE_SUPABASE_KEY
    if (secret !== calculatedSignature) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 403 });
    }

    // const result = await authenticateUser();
    // if (result instanceof NextResponse) return result;
    // const id = result?.id;

    // const user = await prisma.user.findUnique({
    //   where: {
    //     user_id: id,
    //   },
    // });

    // if (!user) {
    //   return NextResponse.json(
    //     { status: "error", message: "User does not exist" },
    //     { status: 404 }
    //   );
    // }
    return NextResponse.json(
      {
        status: "success",
        message: "User deleted",
        random: crypto.randomBytes(32).toString("hex"),
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Server Error", error: err, status: "error" },
      { status: 500 }
    );
  }
}

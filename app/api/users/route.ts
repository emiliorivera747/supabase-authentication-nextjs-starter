import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";
import {
  recordSchema,
  RecordSchema,
} from "@/features/auth/schemas/formSchemas";

import { handleZodError } from "@/utils/api-helpers/handleZodErrors";
const getNameFromBody = (body: RecordSchema) =>
  body?.record?.raw_user_meta_data?.name || body?.record?.email || "none";

const getEmailVerifiedFromBody = (body: RecordSchema) =>
  body?.record?.raw_user_meta_data?.email_verified || false;

const getPhoneVerifiedFromBody = (body: RecordSchema) =>
  body?.record?.raw_user_meta_data?.phone_verified || false;

const userAlreadyExistsError = () =>
  NextResponse.json(
    { status: "error", message: "User already exists" },
    { status: 409 }
  );

const parseRecord = (body: RecordSchema) => {
  const { email, id, phone } = body?.record
    ? body.record
    : { email: "none", id: "none" };
  const name = getNameFromBody(body);
  const email_verified = getEmailVerifiedFromBody(body);
  const phone_verified = getPhoneVerifiedFromBody(body);
  return { email, id, name, email_verified, phone, phone_verified };
};

/**
 * Register a new user
 *
 *
 * @route POST /api/users
 * @desc Register a new user
 * @access Public
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body
    recordSchema.parse(body);

    const { email, id, name, email_verified, phone, phone_verified } =
      parseRecord(body);

    const user = await prisma.user.findFirst({
      where: { OR: [{ email }, { user_id: id }] },
    });

    if (user) return userAlreadyExistsError();

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        user_id: id,
        email_verified,
        phone,
        phone_verified,
      },
    });

    return NextResponse.json(
      { status: "success", message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) return handleZodError(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

/**
 * Get users
 * @returns
 */
export async function GET() {
  try {
    const result = await authenticateUser();
    if (result instanceof NextResponse) return result;
    const users = await prisma.user.findMany();
    return NextResponse.json({ status: "success", users }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Server Error", staus: "error", error: error },
        { status: 500 }
      );
    }
  }
}

/**
 * 
 * @param req 
 * @returns 
 */
export async function PUT(req: Request) {
  try {
    const result = await authenticateUser();
    if (result instanceof NextResponse) return result;
    const body = await req.json();
    recordSchema.parse(body);

    const record = body.record;

    const { email, id } = record;
    const name = getNameFromBody(body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User does not exist" },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        id,
      },
    });

    return NextResponse.json(
      { status: "success", message: "User updated", user: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { status: "error", message: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}


/**
 * 
 * @route POST /api/users
 * @desc Register a new user
 * @access Public
 */
export async function DELETE() {
  try {
    const result = await authenticateUser();
    if (result instanceof NextResponse) return result;
    const id = result?.id;

    const user = await prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User does not exist" },
        { status: 404 }
      );
    }
    
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

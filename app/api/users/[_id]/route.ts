import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async (
  request: Request,
  { params }: { params: Promise<{ _id: string }> }
) => {

  try {

    const { _id } = await params;

    if (!_id) {
      return NextResponse.json(
        { message: "User ID not provided", status: "error" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { user_id: _id },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", status: "error" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", data: user.user_id },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { message: "Server Error", status: "error" },
      { status: 500 }
    );
  }
};

import { z } from "zod";
import { NextResponse } from "next/server";
/**
 * Handles errors thrown by Zod schema validation.
 *
 * @param e - The error object, expected to be of type `unknown`.
 * @returns An object representing the state with error details.
 */
export const handleZodError = (e: z.ZodError) => {
  return NextResponse.json(
    {
      status: "error",
      message: "Invalid form data",
      errors: e.issues.map((issue) => ({
        path: issue.path.join("."),
        message: `${issue.message}`,
      })),
    },
    { status: 400 }
  );
};

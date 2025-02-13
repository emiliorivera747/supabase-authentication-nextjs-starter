import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(254, "Email cannot be longer than 254 characters")
    .refine((email) => {
      const [localPart] = email.split("@");
      return localPart.length <= 63;
    }, "Email local part cannot be longer than 63 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const signInSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(254, "Email cannot be longer than 254 characters")
    .refine((email) => {
      const [localPart] = email.split("@");
      return localPart.length <= 63;
    }, "Email local part cannot be longer than 63 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const recordSchema = z.object({
  record: z.object({
    id: z.string().uuid(), // id should be a valid UUID
    email: z
      .string()
      .email("Invalid email format")
      .max(254, "Email cannot be longer than 254 characters")
      .refine((email) => {
        const [localPart] = email.split("@");
        return localPart.length <= 63;
      }, "Email local part cannot be longer than 63 characters"), // email should be a valid email address
    raw_user_meta_data: z
      .object({
        name: z
          .string()
          .max(100, "Name cannot be longer than 100 characters")
          .optional(), // name is optional and cannot be longer than 100 characters
        email_verified: z.boolean().optional(), // email_verified is optional, default will be false if not provided
        phone_verified: z.boolean().optional(), // phone_verified is optional, default will be false if not provided
      })
      .optional(),
    aud: z.string().optional(),
    role: z.string().optional(),
    phone: z.string().nullable().optional(),
    created_at: z.string().nullable().optional(),
    deleted_at: z.string().nullable().optional(),
    invited_at: z.string().nullable().optional(),
    updated_at: z.string().optional(),
    instance_id: z.string().uuid().optional(),
    is_sso_user: z.boolean().optional(),
    banned_until: z.string().nullable().optional(),
    confirmed_at: z.string().nullable().optional(),
    email_change: z.string().optional(),
    is_anonymous: z.boolean().optional(),
    phone_change: z.string().optional(),
    is_super_admin: z.boolean().nullable().optional(),
    recovery_token: z.string().optional(),
    last_sign_in_at: z.string().nullable().optional(),
    recovery_sent_at: z.string().nullable().optional(),
    raw_app_meta_data: z
      .object({
        provider: z.string().optional(),
        providers: z.array(z.any()).optional(),
      })
      .optional(),
    confirmation_token: z.string().optional(),
    email_confirmed_at: z.string().nullable().optional(),
    encrypted_password: z.string().optional(),
    phone_change_token: z.string().optional(),
    phone_confirmed_at: z.string().nullable().optional(),
    confirmation_sent_at: z.string().nullable().optional(),
    email_change_sent_at: z.string().nullable().optional(),
    phone_change_sent_at: z.string().nullable().optional(),
    email_change_token_new: z.string().optional(),
    reauthentication_token: z.string().optional(),
    reauthentication_sent_at: z.string().nullable().optional(),
    email_change_token_current: z.string().optional(),
    email_change_confirm_status: z.number().optional(),
  }),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  code: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
});

export const loginHelpSchema = z.object({
  email: z
  .string()
  .email("Invalid email format")
  .max(254, "Email cannot be longer than 254 characters")
  .refine((email) => {
    const [localPart] = email.split("@");
    return localPart.length <= 63;
  }, "Email local part cannot be longer than 63 characters"),
});

export const emailVerificationSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(254, "Email cannot be longer than 254 characters")
    .refine((email) => {
      const [localPart] = email.split("@");
      return localPart.length <= 63;
    }, "Email local part cannot be longer than 63 characters"),
});

export type SignUpInputs = z.infer<typeof signUpSchema>;
export type SignInInputs = z.infer<typeof signInSchema>;
export type RecordSchema = z.infer<typeof recordSchema>;
export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;
export type LoginHelpInputs = z.infer<typeof loginHelpSchema>;
export type EmailVerificationInputs = z.infer<typeof emailVerificationSchema>;
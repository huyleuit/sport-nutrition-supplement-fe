import z from "zod";

export const AccountRes = z
  .object({
    userId: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256),
});

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;

export const ProfileRes = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerifiedAt: z.string().nullable(),
  phone: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
});

export type ProfileResType = z.TypeOf<typeof ProfileRes>;

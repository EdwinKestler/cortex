import {z} from 'zod';
export const ContactSchema=z.object({
  type:z.enum(['investor','promoter']),
  name:z.string().trim().min(2).max(100),organization:z.string().trim().min(2).max(120),
  country:z.string().trim().min(2).max(80),role:z.string().trim().min(2).max(80),
  size:z.string().trim().min(1).max(80),message:z.string().trim().min(10).max(2000),
  consent:z.literal(true),website:z.string().max(0)
});
export type ContactData=z.infer<typeof ContactSchema>;

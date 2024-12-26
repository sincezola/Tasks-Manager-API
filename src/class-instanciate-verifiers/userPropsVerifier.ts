import { z } from 'zod';
import type { UserProps } from '../entities/User';

export class UserVerifier {
  private userSchema = z.object({
    id: z.optional(z.number().min(1)),
    name: z
      .string()
      .min(4, 'O nome deve ter pelo menos 4 caracteres')
      .max(22, 'O nome deve ter no máximo 22 caracteres'),
    email: z
    .string()
    .email()
    .min(5),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    createdAt: z.optional(z.date())
  });
  
  public isErrorInUserProps = (userProps: UserProps): Error | null => {
    try {
      this.userSchema.parse(userProps);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors.map((err) => err.message).join(', '));
      }
    }
  
    return null;
  };
}

export default new UserVerifier();
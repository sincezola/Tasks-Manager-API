import { z } from 'zod';
import type { TaskProps } from '../entities/Task';

export class TaskVerifier {
  private taskSchema = z.object({
    id: z.number().optional(),
    title: z
      .string()
      .min(4, 'O título deve ter pelo menos 4 caracteres')
      .max(50, 'O título deve ter no máximo 50 caracteres'),
    description: z.string().nullable().default(""), // The description is optional
    status: z
      .string()
      .transform((val) => val.toLowerCase()) // Transforma para minúsculas
      .pipe(
        z.enum(['pendente', 'em progresso', 'concluído'], {
          errorMap: () => ({ message: 'Status inválido' }),
        }),
      ),
    userId: z.number().min(1, 'O id é inválido'),
    createdAt: z.date().optional(),
  });

  public isErrorInTaskProps = (userProps: TaskProps): Error | null => {
    try {
      this.taskSchema.parse(userProps);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors.map((err) => err.message).join(', '));
      }
    }

    return null;
  };
}

export default new TaskVerifier();

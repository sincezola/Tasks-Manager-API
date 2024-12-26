import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdDTO {
  @IsNotEmpty({ message: 'O valor não pode ser vazio.' })
  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @Min(1, { message: 'O valor deve ser maior que 0.' })
  @Transform(
    ({ value }) => (typeof value === 'string' ? Number(value) : value),
    { toClassOnly: true },
  )
  id: number;
}

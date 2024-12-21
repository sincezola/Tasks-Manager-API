import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  // For posts routes

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: 'Title must only contain alphabetic characters',
  })
  @MinLength(4, { message: 'Title must be at least 4 characters long' })
  @MaxLength(20, { message: 'Title must not exceed 20 characters' })
  title: string;

  @IsOptional()
  @Length(5, 500)
  description?: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase()) // Transforma para minúsculas
  @IsIn(['pendente', 'concluida', 'em progresso'], {
    message: 'O status deve ser "pendente", "concluida" ou "em progresso"',
  })
  status: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId: number;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, MaxLength, Min, MinLength } from "class-validator";

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
  @Length(8, 500)
  description?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(9)
  status: string; // Pendente ou Concluida

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId: number;
}
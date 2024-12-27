import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class NameDTO {
  @IsNotEmpty({ message: 'O valor não pode ser vazio.' })
  @IsString({ message: 'Name must be a string.'})
  @MinLength(4, { message: 'Name must be at least 4 characters long.' })
  @MaxLength(22, { message: 'Name must be at most 22 characters long.' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: 'Name must only contain alphabetic characters and spaces.',
  })
  name: string;
}

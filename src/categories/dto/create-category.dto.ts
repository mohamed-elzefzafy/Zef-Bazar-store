import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'title should not be null' })
  @IsString({ message: 'title should be string' })
  title: string;

  @IsNotEmpty({ message: 'description should not be null' })
  @IsString({ message: 'description should be string' })
  description: string;
}

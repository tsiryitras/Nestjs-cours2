import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../entities/book.schema';
import { User } from 'src/auth/entities/user.schema';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly author: string;

  @IsNumber()
  @IsOptional()
  readonly price: number;

  @IsEnum(Category, { message: 'Please enter correct category.' })
  @IsOptional()
  readonly category: Category;

  @IsEmpty({ message: 'You cannot pass user id.' })
  readonly user: User;
}

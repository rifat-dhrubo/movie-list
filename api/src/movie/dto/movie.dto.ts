import { OmitType } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsUrl,
  Length,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

export class MovieDto {
  @IsInt()
  @Min(1)
  id: number;

  createdAt: Date;
  updatedAt: Date;

  @IsInt()
  @Min(1)
  userId: number;
  user: UserDto;

  @Length(2, 200)
  title: string;
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @MinLength(3)
  description: string;

  @IsUrl()
  @IsOptional()
  imdbLink?: string;
  @IsUrl()
  imageLink?: string;
  @IsUrl()
  @IsOptional()
  watchLink?: string;
}

export class GetMovieByIdResponse extends OmitType(MovieDto, [
  'user',
] as const) {}

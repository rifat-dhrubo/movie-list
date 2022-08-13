import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
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

export class MoviePaginationEntities {
  @IsString()
  @IsOptional()
  search?: string;

  @IsInt()
  @IsOptional()
  page?: number = 0;

  @IsInt()
  @IsOptional()
  size?: number = 10;

  @IsEnum(['createdAt', 'updatedAt', 'title', 'rating'])
  @IsOptional()
  @ApiProperty({ enum: ['createdAt', 'updatedAt', 'title', 'rating'] })
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'rating' = 'updatedAt';

  @IsEnum(['asc', 'desc'])
  @IsOptional()
  @ApiProperty({ enum: ['asc', 'desc'] })
  sortOrder?: 'asc' | 'desc' = 'desc';
}

export class MoviePaginationMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  size: number;
  prev: number | null;
  next: number | null;
}

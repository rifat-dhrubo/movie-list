import { OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsIn, IsInt, Length, Min } from 'class-validator';
import { BaseResponseDto } from 'src/common/dto';

export class UserDto {
  @IsInt()
  @Min(1)
  id: number;

  createdAt: Date;
  updatedAt: Date;

  @Length(2, 200)
  name: string;

  @IsEmail()
  email: string;
  hash: string;
}

export class UpdateUserInput extends PartialType(
  OmitType(UserDto, ['hash', 'createdAt', 'updatedAt'] as const),
) {}

export class UpdateUserResponse extends BaseResponseDto {
  content: UserDto;
}

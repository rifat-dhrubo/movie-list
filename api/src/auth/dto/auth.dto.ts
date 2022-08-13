import { OmitType } from '@nestjs/swagger';
import { Length, IsEmail, IsInt, Min } from 'class-validator';
import { BaseResponseDto } from 'src/common/dto';
import { UserDto } from 'src/user/dto/user.dto';

export class SignUpInputDto {
  @Length(2, 200)
  name: string;

  @IsEmail()
  email: string;

  @Length(8, 200)
  password: string;
}

export class SignInInput extends OmitType(SignUpInputDto, ['name'] as const) {}

export class SignInResponse extends BaseResponseDto {
  user: UserDto;
  accessToken: string;
}

export class ChangeUserPasswordInput {
  @IsInt()
  @Min(1)
  userId: number;

  @Length(8, 200)
  currentPassword: string;

  @Length(8, 200)
  newPassword: string;

  @Length(8, 200)
  confirmPassword: string;
}

import { OmitType } from '@nestjs/swagger';
import { Length, IsEmail } from 'class-validator';
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

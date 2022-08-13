import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseResponseDto, BaseSchema, ErrorResponseDto } from 'src/common/dto';
import {
  UpdateUserInput,
  UpdateUserResponse,
  UserDto,
} from 'src/user/dto/user.dto';

import { AuthService } from './auth.service';
import { Public } from './decorator';
import {
  ChangeUserPasswordInput,
  SignInInput,
  SignInResponse,
  SignUpInputDto,
} from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
  })
  @ApiOkResponse({
    type: SignInResponse,
  })
  signIn(@Body() body: SignInInput) {
    return this.auth.signIn(body);
  }

  @Public()
  @Post('sign-up')
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
  })
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  signUp(@Body() body: SignUpInputDto) {
    return this.auth.signUp(body);
  }

  @Patch('change-password')
  @ApiOkResponse({
    type: UpdateUserResponse,
  })
  changePassword(@Body() body: ChangeUserPasswordInput) {
    return this.auth.changePassword(body);
  }
}

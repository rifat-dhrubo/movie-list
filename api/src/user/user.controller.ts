import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { BaseSchema } from 'src/common/dto';

import { UserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Get('me')
  @ApiOkResponse({
    schema: BaseSchema(UserDto),
  })
  me(@GetUser() user: UserDto) {
    return {
      status: HttpStatus.OK,
      message: 'OK',
      content: user,
    };
  }
}

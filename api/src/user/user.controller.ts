import { Body, Controller, Get, HttpStatus, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { BaseSchema } from 'src/common/dto';

import { UpdateUserInput, UpdateUserResponse, UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private user: UserService) {}

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

  @Patch()
  @ApiOkResponse({
    type: UpdateUserResponse,
  })
  updateUser(@Body() body: UpdateUserInput, @GetUser('id') userId: string) {
    return this.user.updateUser(body);
  }
}

import { Controller } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';

import { UserDto } from './dto/user.dto';

@Controller('user')
@ApiExtraModels(UserDto)
export class UserController {}

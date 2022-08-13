import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { UpdateUserInput } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser({ id, email, name }: UpdateUserInput) {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const oldUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!oldUser) {
      throw new NotFoundException('User not found');
    }
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...{ email, name },
      },
    });
    return {
      status: HttpStatus.OK,
      message: 'OK',
      content: { ...user },
    };
  }
}

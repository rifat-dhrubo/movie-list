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

  async updateUser({ userId, email, name }: UpdateUserInput) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    const oldUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!oldUser) {
      throw new NotFoundException('User not found');
    }
    const user = await this.prisma.user.update({
      where: {
        id: userId,
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

import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto, userId: number) {
    if (userId !== createMovieDto.userId) {
      throw new ForbiddenException('You are not allowed to create this movie');
    }
    try {
      const movie = await this.prisma.movie.create({
        data: {
          ...createMovieDto,
        },
      });
      return {
        status: HttpStatus.CREATED,
        message: 'Movie created successfully',
        content: movie,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Movie already exists for user');
        }
      }
    }
  }

  search() {
    return `This action returns all movie searched and paginated`;
  }

  async findOne(id: number, userId: number) {
    const movie = await this.findUniqueOrThrow(id, userId);

    return {
      status: HttpStatus.OK,
      message: 'Movie found successfully',
      content: movie,
    };
  }

  async update(id: number, updateMovieDto: UpdateMovieDto, userId: number) {
    const { userId: _, ...rest } = updateMovieDto;
    try {
      const content = await this.prisma.movie.update({
        where: {
          id_userId: {
            id,
            userId: userId,
          },
        },
        data: {
          ...rest,
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'Movie updated successfully',
        content,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Movie does not exist');
        }
      }
      throw error;
    }
  }

  async remove(id: number, userId: number) {
    try {
      await this.prisma.movie.delete({
        where: {
          id_userId: {
            id,
            userId: userId,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Movie does not exist');
        }
      }
      throw error;
    }
    return {
      status: HttpStatus.OK,
      message: 'Movie deleted successfully',
    };
  }

  async findUniqueOrThrow(id: number, userId: number) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id_userId: {
          id,
          userId: userId,
        },
      },
    });
    if (!movie) {
      throw new NotFoundException('Movie does not exist');
    }
    return movie;
  }
}

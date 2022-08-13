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
import { MoviePaginationEntities } from './dto/movie.dto';
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

  async search(query: MoviePaginationEntities) {
    const [total, movie] = await Promise.all([
      this.prisma.movie.count({
        where: {
          title: {
            search: query.search,
          },
        },
      }),
      this.prisma.movie.findMany({
        take: query.size,
        skip: query.page * query.size,
        where: {
          title: {
            search: query.search,
          },
        },
        orderBy: {
          [query.sortBy]: query.sortOrder,
        },
      }),
    ]);
    const lastPage = Math.ceil(total / query.size) - 1;
    return {
      status: HttpStatus.OK,
      message: 'Search successfull',
      content: movie,
      meta: {
        total,
        lastPage,
        currentPage: query.page,
        size: query.size,
        prev: query.page > 1 ? query.page - 1 : null,
        next: query.page < lastPage ? query.page + 1 : null,
      },
    };
  }

  async findOne(id: number, userId: number) {
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
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { BaseResponseDto, BaseSchema } from 'src/common/dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateMovieDto } from './dto/create-movie.dto';
import { GetMovieByIdResponse, MovieDto } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiCreatedResponse({ schema: BaseSchema(CreateMovieDto) })
  create(
    @Body() createMovieDto: CreateMovieDto,
    @GetUser('id') userId: number,
  ) {
    return this.movieService.create(createMovieDto, userId);
  }

  @Get('search')
  search() {
    return this.movieService.search();
  }

  @Get(':id')
  @ApiOkResponse({ schema: BaseSchema(GetMovieByIdResponse) })
  @ApiExtraModels(GetMovieByIdResponse)
  @ApiExtraModels(MovieDto)
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
  ) {
    return this.movieService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOkResponse({ schema: BaseSchema(GetMovieByIdResponse) })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
    @GetUser('id') userId: number,
  ) {
    return this.movieService.update(id, updateMovieDto, userId);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  remove(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
    return this.movieService.remove(id, userId);
  }
}

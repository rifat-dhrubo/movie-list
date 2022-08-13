import { Module } from '@nestjs/common';
import { MovieListController } from './movie-list.controller';
import { MovieListService } from './movie-list.service';

@Module({
  controllers: [MovieListController],
  providers: [MovieListService]
})
export class MovieListModule {}

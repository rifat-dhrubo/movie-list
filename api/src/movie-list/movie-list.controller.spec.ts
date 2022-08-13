import { Test, TestingModule } from '@nestjs/testing';
import { MovieListController } from './movie-list.controller';

describe('MovieListController', () => {
  let controller: MovieListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieListController],
    }).compile();

    controller = module.get<MovieListController>(MovieListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

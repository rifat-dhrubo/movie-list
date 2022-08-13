import { Test, TestingModule } from '@nestjs/testing';
import { MovieListService } from './movie-list.service';

describe('MovieListService', () => {
  let service: MovieListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieListService],
    }).compile();

    service = module.get<MovieListService>(MovieListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

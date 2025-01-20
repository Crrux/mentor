import { Test, TestingModule } from '@nestjs/testing';
import { BddService } from './bdd.service';

describe('BddService', () => {
  let service: BddService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BddService],
    }).compile();

    service = module.get<BddService>(BddService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

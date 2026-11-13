import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationTableService } from './application-table.service';

describe('ApplicationTableService', () => {
  let service: ApplicationTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationTableService],
    }).compile();

    service = module.get<ApplicationTableService>(ApplicationTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

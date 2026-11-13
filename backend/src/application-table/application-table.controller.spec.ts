import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationTableController } from './application-table.controller';

describe('ApplicationTableController', () => {
  let controller: ApplicationTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationTableController],
    }).compile();

    controller = module.get<ApplicationTableController>(
      ApplicationTableController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

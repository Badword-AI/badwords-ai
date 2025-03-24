import { Test, TestingModule } from '@nestjs/testing';
import { BadwordController } from './badword.controller';
import { BadwordService } from './badword.service';

describe('BadwordController', () => {
  let controller: BadwordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BadwordController],
      providers: [BadwordService],
    }).compile();

    controller = module.get<BadwordController>(BadwordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

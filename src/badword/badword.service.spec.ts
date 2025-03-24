import { Test, TestingModule } from '@nestjs/testing';
import { BadwordService } from './badword.service';

describe('BadwordService', () => {
  let service: BadwordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BadwordService],
    }).compile();

    service = module.get<BadwordService>(BadwordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

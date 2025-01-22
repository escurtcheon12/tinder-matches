import { Test, TestingModule } from '@nestjs/testing';
import { MatcherController } from './matcher.controller';

describe('MatcherController', () => {
  let controller: MatcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatcherController],
    }).compile();

    controller = module.get<MatcherController>(MatcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

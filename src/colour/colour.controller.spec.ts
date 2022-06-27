import { Test, TestingModule } from '@nestjs/testing';
import { ColourController } from './colour.controller';
import { ColourService } from './colour.service';

describe('ColourController', () => {
  let controller: ColourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColourController],
      providers: [ColourService],
    }).compile();

    controller = module.get<ColourController>(ColourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

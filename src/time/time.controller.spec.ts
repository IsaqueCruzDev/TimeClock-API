import { Test, TestingModule } from '@nestjs/testing';
import { TimeController } from './time.controller';
import { TimeService } from '../services/time/time.service';

describe('TimeController', () => {
  let controller: TimeController;

  beforeEach(async () => {
    const mockTimeService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeController],
      providers: [
        {
          provide: TimeService,
          useValue: mockTimeService,
        },
      ],
    }).compile();

    controller = module.get<TimeController>(TimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

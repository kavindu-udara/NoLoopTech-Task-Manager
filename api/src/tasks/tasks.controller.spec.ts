import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call service.findAll and return the result', async () => {
      const result = [{ id: '1', title: 'Test' }];
      mockTasksService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockTasksService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call service.create with the DTO', async () => {
      const dto = { title: 'New Task' } as any;
      const result = { id: '1', ...dto };
      mockTasksService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockTasksService.create).toHaveBeenCalledWith(dto);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { TaskStatus } from './dto/create-task.dto.js';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  const mockPrismaService = {
    task: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);

    // Clear mocks
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const dto = { title: 'Test Task', status: TaskStatus.TODO };
      const result = { id: '1', ...dto, createdAt: new Date(), dueDate: null };
      mockPrismaService.task.create.mockResolvedValue(result);

      const created = await service.create(dto as any);

      expect(created).toEqual(result);
      expect(mockPrismaService.task.create).toHaveBeenCalledWith({
        data: { ...dto, dueDate: null },
      });
    });
  });

  describe('findOne', () => {
    it('should return a task if it exists', async () => {
      const result = {
        id: '1',
        title: 'Test',
        status: TaskStatus.TODO,
        createdAt: new Date(),
      };
      mockPrismaService.task.findUnique.mockResolvedValue(result);

      expect(await service.findOne('1')).toEqual(result);
    });

    it('should throw NotFoundException if task does not exist', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = [
        {
          id: '1',
          title: 'Test',
          status: TaskStatus.TODO,
          createdAt: new Date(),
        },
      ];
      mockPrismaService.task.findMany.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
    });
  });
});

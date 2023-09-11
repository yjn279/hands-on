import { Injectable } from '@nestjs/common';
import { Task } from './models/task.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskInput  } from './dto/createTask.input';

@Injectable()
export class TaskService {
    constructor(private readonly prismaService: PrismaService) {}

    async getTasks(): Promise<Task[]> {
        return await this.prismaService.task.findMany();
    }

    async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
        const { name, dueDate, description } = createTaskInput;
        return await this.prismaService.task.create({
            data: {
                name,
                dueDate,
                description,
            },
        });
    }
}

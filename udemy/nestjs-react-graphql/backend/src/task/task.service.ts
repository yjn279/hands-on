import { Injectable } from '@nestjs/common';
import { Task } from './models/task.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskInput  } from './dto/createTask.input';
import { UpdateTaskInput } from './dto/updateTask.input';
import { DeleteTaskInput } from './dto/deleteTask.input';

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

    async updateTask(updateTaskInput: UpdateTaskInput): Promise<Task> {
        const { id, name, dueDate, status, description } = updateTaskInput;
        return await this.prismaService.task.update({
            data: { name, dueDate, status, description },
            where: { id },
        });
    }

    async deleteTask(deleteTaskInput: DeleteTaskInput): Promise<Task> {
        const { id } = deleteTaskInput;
        return await this.prismaService.task.delete({
            where: { id },
        });
    }
}

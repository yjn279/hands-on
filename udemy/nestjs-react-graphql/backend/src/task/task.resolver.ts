import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { CreateTaskInput } from './dto/createTask.input';
import { Task } from '@prisma/client';
import { UpdateTaskInput } from './dto/updateTask.input';

@Resolver()
export class TaskResolver {
    constructor(private readonly taskService: TaskService) {}

    @Query(() => [TaskModel], { nullable: 'items'})
    async getTasks(): Promise<Task[]> {
        return await this.taskService.getTasks();
    }

    @Mutation(() => TaskModel)
    async createTask(
        @Args('createTaskInput') CreateTaskInput: CreateTaskInput,
    ): Promise<Task> {
        return await this.taskService.createTask(CreateTaskInput)
    }

    @Mutation(() => TaskModel)
    async updateTask(
        @Args('updateTaskInput') UpdateTaskInput: UpdateTaskInput,
    ): Promise<Task> {
        return await this.taskService.updateTask(UpdateTaskInput);
    }
}

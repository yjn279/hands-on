import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { CreateTaskInput } from './dto/createTask.input';
import { Task } from '@prisma/client';
import { UpdateTaskInput } from './dto/updateTask.input';
import { DeleteTaskInput } from './dto/deleteTask.input';

@Resolver()
export class TaskResolver {
    constructor(private readonly taskService: TaskService) {}

    @Query(() => [TaskModel], { nullable: 'items'})
    async getTasks(
        @Args('userId', { type: () => Int }) userId: number,
    ): Promise<Task[]> {
        return await this.taskService.getTasks(userId);
    }

    @Mutation(() => TaskModel)
    async createTask(
        @Args('createTaskInput') createTaskInput: CreateTaskInput,
    ): Promise<Task> {
        return await this.taskService.createTask(createTaskInput);
    }

    @Mutation(() => TaskModel)
    async updateTask(
        @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    ): Promise<Task> {
        return await this.taskService.updateTask(updateTaskInput);
    }

    @Mutation(() => TaskModel)
    async deleteTask(
        @Args('deleteTaskInput') deleteTaskInput: DeleteTaskInput
    ): Promise <Task> {
        return await this.taskService.deleteTask(deleteTaskInput);
    }
}

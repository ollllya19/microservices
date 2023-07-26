import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Ctx, MessagePattern, RmqContext, Payload } from '@nestjs/microservices';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern({ cmd: 'process-task' }) 
  async processTask(@Payload() data, @Ctx() context: RmqContext){

    return this.tasksService.processTask(data)
  }
}

import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern({ cmd: 'process-task' }) 
  async processTask(@Ctx() context: RmqContext){
    const channel = context.getChannelRef()
    const message = context.getMessage()
    channel.ack(message)

    console.log('Processing message: ', message)
    // вызвать метод сервиса

    return { task: "User"}
  }
}

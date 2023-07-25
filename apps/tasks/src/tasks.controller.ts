import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Ctx, MessagePattern, RmqContext, Payload } from '@nestjs/microservices';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern({ cmd: 'process-task' }) 
  async processTask(@Payload() data: number, @Ctx() context: RmqContext){
    const channel = context.getChannelRef()
    const message = context.getMessage()
    channel.ack(message)

    const num = data['number']

    return { result: Math.pow(num, 2) }
  }
}

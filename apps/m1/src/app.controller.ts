import { Controller, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('TASKS_SERVICE') 
  private tasksService: ClientProxy) {}

  @Get()
  async getUser() {
    return this.tasksService.send({
      cmd: 'process-task', 
    }, 
    {})
  }
}

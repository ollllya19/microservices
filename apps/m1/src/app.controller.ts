import { Controller, Inject, Get, Post, Body, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('number')
@Controller()
export class AppController {
  constructor(@Inject('TASKS_SERVICE') 
  private tasksService: ClientProxy) {}

  @Post('number')
  async get_employees_info(@Body() body) {

    const number = body['num']
    
    return this.tasksService.send({
      cmd: 'process-task', 
    }, { number: number })

  }
}

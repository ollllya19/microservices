import { Controller, Inject, Get, Post, Body, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';


@ApiTags('number')
@Controller()
export class AppController {
  constructor(@Inject('TASKS_SERVICE') 
  private tasksService: ClientProxy) {}
  private readonly logger = new Logger(AppController.name);

  @Post('number')
  async get_employees_info(@Body() body) {
    
    const num = body['num']

    if (num === undefined){
      this.logger.error('Inccorect input data')
      return null
    }
    
    this.logger.log(`Input value is ${num}`)

    const rez = this.tasksService.send({
      cmd: 'process-task', 
    }, { num: num })
    
    if (rez === null)
      throw new BadRequestException('Invalid input data')
    
    return rez
  }
}

import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  processTask(data) {

    const num = data['num']

    if (num === undefined) {
      this.logger.error('Incorrect input data')
      return null
    }

    this.logger.log(`Input value is ${num}`)

    const result = Math.pow(num, 2)

    this.logger.log(`Result is ${result}`)
    
    return { result: result}
  }
}

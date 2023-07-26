import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule,{
      logger: ['log', 'error', 'warn', 'debug'],
    });
  const configService = app.get(ConfigService);

  const USER = configService.get('RABBITMQ_USER')
  const PASSWORD = configService.get('RABBITMQ_PASS')
  const HOST = configService.get('RABBITMQ_HOST')
  const QUEUE = configService.get('RABBITMQ_TASKS_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck: false,
      queue: QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  })

  app.startAllMicroservices();
}
bootstrap();

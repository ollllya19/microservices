import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    })
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'TASKS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const USER = configService.get('RABBITMQ_USER')
        const PASSWORD = configService.get('RABBITMQ_PASS')
        const HOST = configService.get('RABBITMQ_HOST')
        const QUEUE = configService.get('RABBITMQ_TASKS_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
            queue: QUEUE,
            queueOptions: {
              durable: true,
            },
          }, 
        });
      },
      inject: [ConfigService],
    }
  ],
})
export class AppModule {}

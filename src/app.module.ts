import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import config from './mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import cookieSession from 'cookie-session';

@Module({
  imports: [MikroOrmModule.forRoot(config), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['jfdkshf'],
        }),
      )
      .forRoutes('*');
  }
}

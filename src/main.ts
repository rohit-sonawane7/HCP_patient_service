import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { BadRequestExceptionFilter, HttpExceptionFilter } from './middlewares/errorHandler';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(new BadRequestExceptionFilter());
    await app.listen(8000);
    Logger.log('Application is running on: http://localhost:8000', 'Bootstrap');
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigin = process.env.FRONTEND_URL?.split(',') || ['http://localhost:3000'];
  app.enableCors({
    origin: allowedOrigin,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const SERVICE_PORT = process.env.SERVICE_PORT
    ? parseInt(process.env.SERVICE_PORT)
    : 3001;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(SERVICE_PORT);
}
bootstrap();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { DogsController } from './dogs/dogs.controller';

@Module({
    imports: [],
    controllers: [AppController, CatsController],
    providers: [AppService, CatsService],
})
export class AppModule { }

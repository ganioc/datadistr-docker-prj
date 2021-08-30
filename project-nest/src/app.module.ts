import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { DogsController } from './dogs/dogs.controller';
import { InTaskModel } from './entity/InTaskModel';
import { OutTaskModel } from './entity/OutTaskModel';
import { TasksController } from './tasks.controller';
import { TasksModule } from './tasks.module';
import { TasksService } from './tasks.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: '192.168.0.199',
            port: 27017,
            username: 'john',
            password: 'dianke123',
            database: 'admin',
            synchronize: true,
            logging: true,
            useUnifiedTopology: true,
            entities: ['dist/entity/**/*.js'],
            extra: {
                authSource: 'admin',
            },
        }),
        TasksModule,
    ],
    controllers: [AppController, CatsController],
    providers: [AppService, CatsService],
})
export class AppModule {
    constructor(private connection: Connection) { }
}

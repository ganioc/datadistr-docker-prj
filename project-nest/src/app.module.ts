import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TasksModule } from './tasks.module';

const HOST = process.env.HOST ? process.env.HOST : '192.168.0.199';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 27017;
const USERNAME = process.env.USERNAME ? process.env.USERNAME : 'john';
const PASSWORD = process.env.PASSWORD ? process.env.PASSWORD : 'dianke123';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: HOST,
            port: PORT,
            username: USERNAME,
            password: PASSWORD,
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

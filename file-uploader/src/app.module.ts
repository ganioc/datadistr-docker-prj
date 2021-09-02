import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const HOST = process.env.HOST ? process.env.HOST : '192.168.0.199';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5432;
const USERNAME = process.env.USERNAME ? process.env.USERNAME : 'john';
const DBNAME = process.env.PASSWORD ? process.env.PASSWORD : 'db';
const PASSWORD = process.env.PASSWORD ? process.env.PASSWORD : 'dianke123';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: HOST,
            port: PORT,
            username: USERNAME,
            password: PASSWORD,
            database: DBNAME,
            synchronize: true,
            logging: true,
            entities: ['dist/entity/**/*.js'],
            migrations: ['build/migration/**/*.js'],
            subscribers: ['build/subscriber/**/*.js'],
            cli: {
                entitiesDir: 'src/entity',
                migrationsDir: 'src/migration',
                subscribersDir: 'src/subscriber',
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {
        // init database here?
    }
}

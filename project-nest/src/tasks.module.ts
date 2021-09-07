import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InTaskModel } from "./entity/InTaskModel";
// import { InTaskService } from './inTask.service';
// import { OutTaskService } from './outTask.service';
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
    imports: [TypeOrmModule.forFeature([InTaskModel])],
    providers: [TasksService],
    controllers: [TasksController],
})
export class TasksModule { }

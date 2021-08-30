import { Body, Controller, Get, Post } from '@nestjs/common';
import { RpcReq, RpcRsp } from './model/reqrsp.dto';
// import { InTaskService } from './inTask.service';
// import { OutTaskService } from './outTask.service';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get('intask')
    findInTask() {
        console.log('get intask');
        // return 'get intask';
        return this.tasksService.findAll();
    }
    @Post('rpc/v1/')
    async apiRpc(@Body() req: RpcReq): Promise<RpcRsp> {
        console.log(req);
        return await this.tasksService.apiRpcV1(req);
    }
    @Get('outtask')
    findOutTask() {
        console.log('get outTask');
        return 'get outtask';
    }
}

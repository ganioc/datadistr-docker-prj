import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { handleReq } from './method/handle';
import { RpcReq, RpcRsp } from './model/reqrsp.dto';
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('intask')
    getInTask(): string {
        return 'intask details';
    }

    // @Get(':id')
    // findOne(@Param() params): string {
    //     console.log(params.id);
    //     return `This action returns a #${params.id} cat`;
    // }
    @Post('rpc/v1/')
    async handleRpc(@Body() req: RpcReq): Promise<RpcRsp | any> {
        console.log(req);

        return await handleReq(req);
    }
}

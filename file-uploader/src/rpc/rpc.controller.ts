import { Body, Controller, Post } from '@nestjs/common';
import { RpcReq, RpcRsp, RpcRspErr } from 'src/interface/interface';
import { RpcService } from './rpc.service';

@Controller('rpc')
export class RpcController {
    constructor(private rpcService: RpcService) {
        // service
    }
    @Post('v2')
    async apiRpc(@Body() req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        console.log(req);
        return this.rpcService.handle(req);
    }
}

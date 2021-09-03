import { Body, Controller, Post } from '@nestjs/common';
import { RpcReq, RpcRsp } from 'src/interface/interface';
import { RpcService } from './rpc.service';

@Controller('rpc')
export class RpcController {
    constructor(private rpcService: RpcService) {
        // service
    }
    @Post('v1')
    async apiRpc(@Body() req: RpcReq): Promise<RpcRsp> {
        console.log(req);
        return this.rpcService.handle(req);
    }

}

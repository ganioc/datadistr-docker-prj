import { RpcReq, RpcRsp } from '../model/get.dto';

export async function handleReq(req: RpcReq): Promise<RpcRsp | any> {
    console.log('id:', req.id);
    return {};
}

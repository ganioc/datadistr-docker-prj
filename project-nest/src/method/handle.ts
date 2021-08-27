import { RpcReq, RpcRsp } from '../model/reqrsp.dto';

async function handleGetInTask(req: RpcReq): Promise<RpcRsp> {
    const rsp = {
        id: req.id,
        name: req.name,
        data: [
            {
                finished: false,
                block: 1,
                txIndex: 0,
                address: '0xasf',
                pubKey: 'xsdfdf',
                hashId: 'ssdf',
            },
        ],
    };
    return rsp as RpcRsp;
}

async function handleGetOutTask(req: RpcReq): Promise<RpcRsp> {
    const rsp: RpcRsp = {
        id: req.id,
        name: req.name,
        data: [
            {
                finished: false,
                block: 1,
                txIndex: 0,
                address: '0xasf',
                pubKey: 'xsdfdf',
                status: 'succeed',
                encryptSecret: 'asdfsdafasdf',
                oldHashId: 'xxx',
                newHashId: 'yyy',
            },
        ],
    };
    return rsp as RpcRsp;
}

export async function handleReq(req: RpcReq): Promise<RpcRsp | any> {
    console.log('id:', req.id);
    console.log('name:', req.name);

    switch (req.name) {
        case 'GetInTask':
            return handleGetInTask(req);
            break;
        case 'GetOutTask':
            return handleGetOutTask(req);
            break;
        default:
            break;
    }

    return {};
}

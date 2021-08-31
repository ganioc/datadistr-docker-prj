import {
    InTask,
    MarkInTask,
    MarkOutTask,
    OutTask,
    QueryInTask,
    QueryOutTask,
    RpcReq,
    RpcRsp,
    RpcStatusCode,
} from '../model/reqrsp.dto';

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
        statusCode: RpcStatusCode.OK,
        data: [
            {
                finished: false,
                block: 1,
                txIndex: 0,
                address: '0xasf',
                pubKey: 'xsdfdf',
                status: 0,
                encryptSecret: 'asdfsdafasdf',
                oldHashId: 'xxx',
                newHashId: 'yyy',
            },
        ],
    };
    return rsp as RpcRsp;
}
async function handleQueryInTask(req: RpcReq): Promise<RpcRsp> {
    const data = req.data as QueryInTask;
    const rsp: RpcRsp = {
        id: req.id,
        name: req.name,
        statusCode: RpcStatusCode.OK,
        data: {
            pageOffset: data.pageOffset,
            pageSize: data.pageSize,
            total: 1,
            finished: data.finished,
            all: data.all,
            data: [
                {
                    finished: false,
                    block: 1,
                    txIndex: 0,
                    address: '0xasf',
                    pubKey: 'xsdfdf',
                    hashId: 'asdfsdafasdf',
                },
            ],
        },
    };
    return rsp as RpcRsp;
}
async function handleQueryOutTask(req: RpcReq): Promise<RpcRsp> {
    const data = req.data as QueryOutTask;
    const rsp: RpcRsp = {
        id: req.id,
        name: req.name,
        statusCode: RpcStatusCode.OK,
        data: {
            pageOffset: data.pageOffset,
            pageSize: data.pageSize,
            total: 1,
            finished: data.finished,
            all: data.all,
            data: [
                {
                    finished: false,
                    block: 1,
                    txIndex: 0,
                    address: '0xasf',
                    pubKey: 'xsdfdf',
                    status: 0,
                    encryptSecret: 'asdfsdafasdf',
                    oldHashId: 'xxx',
                    newHashId: 'yyy',
                },
            ],
        },
    };
    return rsp as RpcRsp;
}
async function handleInsertInTask(req: RpcReq): Promise<RpcRsp> {
    const data = req.data as InTask;
    const rsp: RpcRsp = {
        id: req.id,
        name: req.name,
        statusCode: RpcStatusCode.OK,
        data: [data],
    };
    return rsp as RpcRsp;
}
async function handleInsertOutTask(req: RpcReq): Promise<RpcRsp> {
    const data = req.data as OutTask;
    const rsp: RpcRsp = {
        id: req.id,
        name: req.name,
        statusCode: RpcStatusCode.OK,
        data: [data],
    };
    return rsp as RpcRsp;
}
async function handleMarkInTask(req: RpcReq): Promise<RpcRsp> {
    const data = req.data as MarkInTask;
    const rsp: RpcRsp = {
        id: req.id,
        name: req.name,
        statusCode: RpcStatusCode.OK,
        data: [
            {
                finished: false,
                block: 1,
                txIndex: 0,
                address: '0xasf',
                pubKey: 'xsdfdf',
                hashId: 'asdfsdafasdf',
            },
        ],
    };
    return rsp as RpcRsp;
}
async function handleMarkOutTask(req: RpcReq): Promise<RpcRsp> {
    const data = req.data as MarkOutTask;
    const rsp: RpcRsp = {
        id: req.id,
        name: req.name,
        statusCode: RpcStatusCode.OK,
        data: [
            {
                finished: false,
                block: 1,
                txIndex: 0,
                address: '0xasf',
                pubKey: 'xsdfdf',
                status: 0,
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
        case 'QueryInTask':
            return handleQueryInTask(req);
            break;
        case 'QueryOutTask':
            return handleQueryOutTask(req);
            break;
        case 'InsertInTask':
            return handleInsertInTask(req);
            break;
        case 'InsertOutTask':
            return handleInsertOutTask(req);
            break;
        case 'MarkInTask':
            return handleMarkInTask(req);
            break;
        case 'MarkOutTask':
            return handleMarkOutTask(req);
            break;
        default:
            break;
    }

    return {};
}

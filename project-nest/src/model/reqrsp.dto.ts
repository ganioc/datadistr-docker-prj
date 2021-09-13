import { InTaskModel } from "src/entity/InTaskModel";
import { OutTaskModel } from "src/entity/OutTaskModel";
import { StatusOutTask, TaskType } from "./type";

export class MarkInTask {
    block: number;
    txIndex: number;
}
export class MarkOutTask {
    block: number;
    txIndex: number;
}
export class GetTask {
    block: number;
    txIndex: number;
    hashId: string;
    address: string;
}
export class GetState {
    id: number;
}

export class SetState {
    id: number;
    latestBlock: number;

    latestTxIndex: number;
}

export class QueryInTask {
    pageOffset: number;
    pageSize: number;
    finished: boolean;
    all: boolean;
}

export class QueryOutTask {
    pageOffset: number;
    pageSize: number;
    finished: boolean;
    all: boolean;
}
export class QueryInTaskRsp {
    pageOffset: number;
    pageSize: number;
    total: number;
    finished: boolean;
    all: boolean;
    data: InTask[];
}
export class QueryOutTaskRsp {
    pageOffset: number;
    pageSize: number;
    total: number;
    finished: boolean;
    all: boolean;
    data: OutTask[];
}
export class QueryStateRsp {
    id: number;
    latestBlock: number;
    latestTxIndex: number;
}
export class InTask {
    finished: boolean;
    block: number;
    txIndex: number;
    address: string;
    pubKey: string;
    hashId: string;
}
export class OutTask {
    finished: boolean;
    block: number;
    txIndex: number;
    address: string;
    pubKey: string;
    status: StatusOutTask;
    encryptSecret: string;
    oldHashId: string;
    newHashId: string;
}

//////////////////////////////////
export class RpcReq {
    id: number;
    jsonrpc: "2.0";
    method: TaskType;
    params:
        | []
        | InTask
        | OutTask
        | MarkInTask
        | MarkOutTask
        | QueryInTask
        | QueryOutTask
        | GetTask
        | GetState
        | SetState;
}

export class RpcRsp {
    id: number;
    jsonrpc: "2.0";
    result: {
        name: TaskType;
        data:
        | InTask[]
        | OutTask[]
        | QueryInTaskRsp
        | QueryOutTaskRsp
        | QueryStateRsp;
    };
}
export class RpcRspErr {
    id: number;
    jsonrpc: "2.0";
    error: {
        code: RpcStatusCode;
        message: string;
        data: [];
    };
}
export enum RpcStatusCode {
    OK = 0,
    /* user defined error */
    EXIST = -32000,
    DB_FAIL = -32001,
    EMPTY = -32002,
    /*  end of user defined */
    PARSE_ERROR = -32700,
    INVALID_REQUEST = -32600,
    METHOD_NOT_FOUND = -32601,
    INVALID_PARAMS = -32602,
    INTERNAL_ERROR = -32603,
}

export function transInTaskModel(task: InTaskModel): InTask {
    return {
        finished: task.finished,
        block: task.block,
        txIndex: task.txIndex,
        address: task.address,
        pubKey: task.pubKey,
        hashId: task.hashId,
    };
}
export function transOutTaskModel(task: OutTaskModel): OutTask {
    return {
        finished: task.finished,
        block: task.block,
        txIndex: task.txIndex,
        address: task.address,
        pubKey: task.pubKey,
        status: task.status as StatusOutTask,
        encryptSecret: task.encryptSecret,
        oldHashId: task.oldHashId,
        newHashId: task.newHashId,
    };
}

import { InTaskModel } from 'src/entity/InTaskModel';
import { OutTaskModel } from 'src/entity/OutTaskModel';
import { StatusOutTask, TaskType } from './type';

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
    name: TaskType;
    data:
        | null
        | InTask
        | OutTask
        | MarkInTask
        | MarkOutTask
        | QueryInTask
        | QueryOutTask
        | GetTask;
}

export class RpcRsp {
    id: number;
    name: TaskType;
    statusCode: number;
    data: InTask[] | OutTask[] | QueryInTaskRsp | QueryOutTaskRsp;
}
export enum RpcStatusCode {
    OK = 0,
    UNKNOWN = 1,
    WRONG_ARG = 2,
    FAIL = 3,
    EXIST = 4,
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

import { StatusOutTask, TaskType } from './type';

export class MarkInTask {
    block: number;
    txIndex: number;
}
export class MarkOutTask {
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

export class QueryOutTaskRsp {
    pageOffset: number;
    pageSize: number;
    total: number;
    finished: boolean;
    all: boolean;
    data: OutTask[];
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
        | QueryOutTask;
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

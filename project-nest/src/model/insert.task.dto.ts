import { StatusOutTask } from './type';

export class InsertInTask {
    id: number;
    finished: boolean;
    block: number;
    txIndex: number;
    address: string;
    pubKey: string;
    hashId: string;
}
export class InsertOutTask {
    id: number;
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

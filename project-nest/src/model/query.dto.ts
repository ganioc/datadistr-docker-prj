import { InsertInTask, InsertOutTask } from './insert.task.dto';

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
    data: InsertInTask[];
}
export class QueryOutTaskRsp {
    pageOffset: number;
    pageSize: number;
    finished: boolean;
    all: boolean;
    data: InsertOutTask[];
}

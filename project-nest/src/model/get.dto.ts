import { InsertInTask, InsertOutTask } from './insert.task.dto';
import { TaskType } from './type';
import { SetInTask, SetOutTask } from './set.dto';
import { QueryInTask, QueryInTaskRsp, QueryOutTask, QueryOutTaskRsp } from './query.dto';

export class RpcReq {
    id: number;
    name: TaskType;
    data:
        | null
        | InsertInTask
        | InsertOutTask
        | SetInTask
        | SetOutTask
        | QueryInTask
        | QueryOutTask;
}

export class RpcRsp {
    id: number;
    name: TaskType;
    data: InsertInTask[] | InsertOutTask[] | QueryInTaskRsp | QueryOutTaskRsp;
}

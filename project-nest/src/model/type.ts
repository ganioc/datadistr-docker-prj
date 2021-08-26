export type TaskType =
    | 'GetInTask'
    | 'GetOutTask'
    | 'QueryInTask'
    | 'QueryOutTask'
    | 'InsertInTask'
    | 'InsertOutTask'
    | 'SetInTask'
    | 'SetOutTask';

export type StatusOutTask = 'succeed' | 'hash-not-found';

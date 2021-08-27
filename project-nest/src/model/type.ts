export type TaskType =
    | 'GetInTask'
    | 'GetOutTask'
    | 'QueryInTask'
    | 'QueryOutTask'
    | 'InsertInTask'
    | 'InsertOutTask'
    | 'MarkInTask'
    | 'MarkOutTask';

export type StatusOutTask = 'succeed' | 'hash-not-found';

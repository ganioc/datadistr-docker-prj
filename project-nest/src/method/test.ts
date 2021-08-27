type TaskType =
    | 'GetInTask'
    | 'GetOutTask'
    | 'QueryInTask'
    | 'QueryOutTask'
    | 'InsertInTask'
    | 'InsertOutTask'
    | 'SetInTask'
    | 'SetOutTask';

const a: TaskType = 'GetInTask';

console.log(typeof a);

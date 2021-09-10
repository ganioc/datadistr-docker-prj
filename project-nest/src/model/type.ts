export type TaskType =
    | "GetInTask"
    | "GetOutTask"
    | "QueryInTask"
    | "QueryOutTask"
    | "InsertInTask"
    | "InsertOutTask"
    | "MarkInTask"
    | "MarkOutTask"
    | "GetCertainInTask"
    | "GetCertainOutTask"
    | "DeleteAllInTask"
    | "DeleteAllOutTask"
    | "GetState"
    | "SetState";

export type StatusOutTask = 0 | 1;

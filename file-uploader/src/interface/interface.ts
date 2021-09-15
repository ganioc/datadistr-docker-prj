
export type ReqType = "addGroup" | "getGroups" | "delGroup" | "getGroup" | "getGroupUsers" | "addUser" | "getUsers" | "getUser" | "delUser" | "addUserToGroup" | "delUserFromGroup" | "getRecords" | "getRecord" | "getRecordCopys" | "insertRecordCopy" | "delRecordCopy" | "getRecordCopy";

export type RspType = ReqType;
export const DEFAULT_GROUP = 0;
export const DEFAULT_PAGESIZE = 25;

export class ReqAddGroup {
    groupId: number;
    alias: string;
    level: number;
}
export class ReqGetGroups {
    pageOffset: number;
    pageSize: number;
}

export class ReqGetGroupUsers {
    groupId: number;
    pageOffset: number;
    pageSize: number;
}
export class ReqGetGroup {
    groupId: number;
}
export class ReqDelGroup {
    groupId: number;
}
export class ReqAddUser {
    address: string;
    name: string;
    organization: string;
}
export class ReqGetUsers {
    pageOffset: number;
    pageSize: number;
}
export class ReqGetUser {
    address: string;
}
export class ReqDelUser {
    address: string;
}
export class ReqAddUserToGroup {
    address: string;
    groupId: number;
}
export class ReqDelUserFromGroup {
    address: string;
    groupId: number;
}
export class ReqGetRecords {
    pageOffset: number;
    pageSize: number;
}
export class ReqGetRecord {
    hashId: string;
}
export class ReqGetRecordCopys {
    pageOffset: number;
    pageSize: number;
}
export class ReqInsertRecordCopy {
    hashId: string;
    newFileName: string;
    newHashId: string;
    secret: string;
    groupId: number;
}
export class ReqDelRecordCopy {
    hashId: string;
    groupId: number;
}
export class ReqGetRecordCopy {
    hashId: string;
    groupId: number;
}
export class RpcReq {
    id: number;
    jsonrpc: "2.0";
    method: ReqType;
    params:
        | null
        | ReqAddGroup
        | ReqGetGroups
        | ReqGetGroupUsers
        | ReqGetGroup
        | ReqDelGroup
        | ReqAddUser
        | ReqGetUsers
        | ReqGetUser
        | ReqDelUser
        | ReqAddUserToGroup
        | ReqDelUserFromGroup
        | ReqGetRecords
        | ReqGetRecord
        | ReqGetRecordCopys
        | ReqInsertRecordCopy
        | ReqDelRecordCopy
        | ReqGetRecordCopy
        ;
}
export class RspGroup {
    groupId: number;
    alias: string;
    level: number;

}
export class RspUser {

}
export class RspRecord {
}
export class RspRecordCopy {

}
export class RspGroupPagination {
    groupId: number;
    pageOffset: number;
    pageSize: number;
    total: number;
    data: RspGroup[]
}
export class RspGroupUserPagination {
    pageOffset: number;
    pageSize: number;
    total: number;
    data: RspUser[]
}
export class RspUserPagination {
    pageOffset: number;
    pageSize: number;
    total: number;
    data: RspUser[]
}

export class RspRecordPagination {
    pageOffset: number;
    pageSize: number;
    total: number;
    data: RspRecord[]
}
export class RspRecordCopyPagination {
    pageOffset: number;
    pageSize: number;
    total: number;
    data: RspRecordCopy[]
}
export type RpcRspData =
    null
    | []
    | RspGroup[]
    | RspUser[]
    | RspRecord[]
    | RspRecordCopy[]
    | RspGroupPagination
    | RspGroupUserPagination
    | RspUserPagination
    | RspRecordPagination
    | RspRecordCopyPagination


export class RpcRsp {
    id: number;
    jsonrpc: "2.0";
    result: {
        name: RspType;
        data: RpcRspData;
    }
}
export class RpcRspErr {
    id: number;
    jsonrpc: "2.0";
    error: {
        code: RpcStatusCode;
        message: string;
        data: RpcRspData;
    }
}
export enum RpcStatusCode {
    OK = 0,
    UNKNOWN = 1,
    WRONG_ARG = 2,
    FAIL = 3,
    EXIST = 4,
    DB_FAIL = 5,
    EMPTY = 6,
}
import { BasicJson, createBasicJson } from "./generic";

export function fileGetUser(address: string): BasicJson {
    let json = createBasicJson();
    json.method = "getUser";
    json.params = {
        address: address
    }
    return json;
}

export function fileGetRecord(hashId: string): BasicJson {
    let json = createBasicJson();
    json.method = "getRecord";
    json.params = {
        hashId: hashId
    }
    return json;
}

export function fileGetRecordCopy(hashId: string, groupId: number): BasicJson {
    let json = createBasicJson();
    json.method = "getRecordCopy";
    json.params = {
        hashId: hashId,
        groupId: groupId,
    }
    return json;
}

export function fileInsertRecordCopy(hashId: string, groupId: number, newFileName: string, newHashId: string, secret: string): BasicJson {
    let json = createBasicJson();
    json.method = "insertRecordCopy";
    json.params = {
        hashId: hashId,
        groupId: groupId,
        newFileName: newFileName,
        newHashId: newHashId,
        secret: secret,
    }
    return json;
}

import { BasicJson, createBasicJson } from "./generic";


export function taskGetInTask(): BasicJson {
    let json = createBasicJson();
    json.method = "GetInTask";
    json.params = {
    }
    return json;
}
export function taskGetCertainOutTask(block: number, txIndex: number, address: string, hashId: string): BasicJson {
    let json = createBasicJson();
    json.method = "GetCertainOutTask"
    json.params = {
        block: block,
        txIndex: txIndex,
        address: address,
        hashId: hashId,
    }
    return json
}

export function taskInsertOutTask(block: number, txIndex: number, address: string, hashId: string, pubKey: string, status: number, encryptSecret: string, newHashId: string): BasicJson {
    let json = createBasicJson();
    json.method = "InsertOutTask"
    json.params = {
        finished: false,
        block: block,
        txIndex: txIndex,
        address: address,
        pubKey: pubKey,
        status: status,
        encryptSecret: encryptSecret,
        oldHashId: hashId,
        newHashId: newHashId,
    }
    return json;
}

export function taskMarkInTask(block: number, txIndex: number, address: string, hashId: string): BasicJson {
    let json = createBasicJson();
    json.method = "MarkInTask"
    json.params = {
        block: block,
        txIndex: txIndex,
        address: address,
        hashId: hashId,
    }
    return json;
}
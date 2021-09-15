import { axiosFile, GenericRpcRsp } from "../axios.wrapper";
import { FileRpcRsp, FileRpcRspErr, RspRecord, RspRecordCopy, RspUser } from "../interface/file";
import { fileGetRecord, fileGetRecordCopy, fileGetUser } from "../jsonrpc/file";

export async function getUserFile(url: string, address: string): Promise<RspUser | null> {
    let fb = await axiosFile(url, fileGetUser(address))

    if (fb.result) {
        let data = ((fb.data as FileRpcRsp).result.data as RspUser[])[0];
        console.log(data);
        return data;
    } else {
        let data = fb.data as FileRpcRspErr;
        console.log(data.error.message);
        return null;
    }
}

export async function getRecordFile(url: string, hashId: string): Promise<RspRecord | null> {
    let fb = await axiosFile(url, fileGetRecord(hashId))
    if (fb.result) {
        let data = ((fb.data as FileRpcRsp).result.data as RspRecord[])[0];
        console.log(data);
        return data;
    } else {
        let data = fb.data as FileRpcRspErr;
        console.log(data.error.message);
        return null;
    }
}

export async function getRecordCopyFile(url: string, hashId: string, groupId: number): Promise<RspRecordCopy | null> {
    let fb = await axiosFile(url, fileGetRecordCopy(hashId, groupId));
    if (fb.result) {
        let data = ((fb.data as FileRpcRsp).result.data as RspRecordCopy[])[0];
        console.log(data);
        return data;
    } else {
        let data = fb.data as FileRpcRspErr;
        console.log(data.error.message);
        return null;
    }
}
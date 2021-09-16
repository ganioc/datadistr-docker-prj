import { axiosTask } from "../axios.wrapper";
import { InTask, OutTask, TaskRpcRsp, TaskRpcRspErr } from "../interface/task";
import { taskGetCertainOutTask, taskGetInTask, taskInsertOutTask, taskMarkInTask } from "../jsonrpc/task";


export async function getOneInTask(url: string): Promise<InTask | null> {
    let fb = await axiosTask(url, taskGetInTask());

    if (fb.result) {
        let inTask = ((fb.data as TaskRpcRsp).result.data as InTask[])[0];
        console.log(inTask)
        return inTask;
    }
    else {
        let data = fb.data as TaskRpcRspErr;
        console.log(data.error.message)
        return null;
    }
}

export async function getCertainOutTask(url: string, block: number, txIndex: number, address: string, hashId: string): Promise<OutTask | null> {
    let fb = await axiosTask(url, taskGetCertainOutTask(
        block,
        txIndex,
        address,
        hashId,
    ))
    if (fb.result) {
        let outTask = ((fb.data as TaskRpcRsp).result.data as OutTask[])[0];
        console.log(outTask);
        return outTask;
    } else {
        let data = fb.data as TaskRpcRspErr;
        console.log(data.error.message)
        return null;
    }
}
export async function insertOutTask(url: string, block: number, txIndex: number, address: string, hashId: string, pubKey: string, status: number, encryptSecret: string, newHashId: string): Promise<boolean> {
    let fb = await axiosTask(url,
        taskInsertOutTask(
            block,
            txIndex,
            address,
            hashId,
            pubKey,
            status,
            encryptSecret,
            newHashId,
        ))
    if (fb.result) {
        return true;
    }
    else {
        return false;
    }
}
export async function markInTask(url: string, block: number, txIndex: number, address: string, hashId: string): Promise<boolean> {
    let fb = await axiosTask(url,
        taskMarkInTask(block, txIndex, address, hashId))
    if (fb.result) {
        return true;
    } else {
        return false
    }
}
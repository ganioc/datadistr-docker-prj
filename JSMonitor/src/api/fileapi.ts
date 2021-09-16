import { axiosFile, GenericRpcRsp } from "../axios.wrapper";
import { FileRpcRsp, FileRpcRspErr, RspRecord, RspRecordCopy, RspUser } from "../interface/file";
import { InTask } from "../interface/task";
import { fileGetRecord, fileGetRecordCopy, fileGetUser } from "../jsonrpc/file";
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
const crypto = require("crypto")

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
function getRadom32(): string {
    const bufSecret = crypto.randomBytes(32);
    console.log("bufSecret len: ", bufSecret.length)
    console.log(bufSecret);
    console.log(bufSecret.toString('hex'))
    return bufSecret.toString('hex')
}
const readFilePromise = util.promisify(fs.readFile);

async function readFile(filePath: string): Promise<Buffer | null> {
    try {
        return await readFilePromise(filePath)
    } catch (e) {
        console.log("read failed");
        return null;
    }
}

export async function insertRecordCopyFile(url: string, inTask: InTask, record: RspRecord, groupId: number): Promise<RspRecordCopy | null> {

    // get file
    // Directly read from local storage!!! Great idea
    let hashId = inTask.hashId;
    let buf = await readFile(path.join('./upload', hashId))
    if (buf === null) {
        console.log("file not found!")
        return null;
    }

    // generate a random key, hexstring
    let secret = getRadom32();

    // encrypt it with AES256, pubKey

    let newFileName = ""

    // get a new HashId,
    let newHashId = ""

    // save it to local upload directory, 


    // save recordCopy
    // let fb = await axiosFile(url, fileInsertRecordCopy(
    //     inTask.hashId,
    //     groupId,
    //     newFileName,
    //     newHashId,
    //     secret
    // ));

    return null;

}
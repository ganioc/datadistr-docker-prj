import { axiosFile } from "../axios.wrapper";
import { FileRpcRsp, FileRpcRspErr, RspRecord, RspRecordCopy, RspUser } from "../interface/file";
import { InTask, TaskRpcRsp } from "../interface/task";
import { fileGetRecord, fileGetRecordCopy, fileGetUser, fileInsertRecordCopy } from "../jsonrpc/file";
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
const crypto = require("crypto")
import * as bs58 from 'bs58';

const eccrypto = require("eccrypto");

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
function encrypt(secret: Buffer, data: Buffer): Buffer {
    let iv = Buffer.alloc(16);

    let cipher = crypto.createCipheriv('aes-256-cbc', secret, iv);
    let encryptedData = cipher.update(data, "hex", "hex")
    encryptedData += cipher.final("hex")
    // console.log('encryptedData: ', encryptedData)
    // console.log('encryptedData len: ', encryptedData.length)
    return Buffer.from(encryptedData, 'hex');
}
function decrypt(secret: Buffer, data: Buffer): Buffer {
    let iv = Buffer.alloc(16);

    let decipher = crypto.createDecipheriv('aes-256-cbc', secret, iv);
    let decryptedData = decipher.update(data, "hex", "hex")
    decryptedData += decipher.final("hex")

    // console.log(decryptedData.toString())
    let dataFinal = Buffer.from(decryptedData, "hex")
    // console.log("decryptedData: ", dataFinal)
    // console.log("decryptedData len: ", dataFinal.length)
    return dataFinal;
}
async function ecies(pubkey: Buffer, secret: Buffer): Promise<string> {
    let encryptMsg = await eccrypto.encrypt(pubkey, secret);
    let buf = Buffer.concat([
        encryptMsg.iv,
        encryptMsg.ephemPublicKey,
        encryptMsg.ciphertext,
        encryptMsg.mac
    ])
    // 16, 65, 48, 32 = 161 bytes
    return buf.toString('hex')
}
function ipfsHash(buf: Buffer): string {
    const hashFunction = Buffer.from('12', 'hex');
    const digest = crypto.createHash('sha256').update(buf).digest();
    console.log(digest.toString('hex'));

    const digestSize = Buffer.from(digest.byteLength.toString(16), 'hex');
    console.log(digestSize.toString('hex'));

    const combined = Buffer.concat([hashFunction, digestSize, digest])
    console.log(combined.toString('hex'));

    const multihash = bs58.encode(combined);
    console.log(multihash.toString());

    return multihash.toString();
}
const readFilePromise = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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

    let encryptedBuf = encrypt(Buffer.from(secret, 'hex'), buf);
    // get a new HashId,
    let newHashId = ipfsHash(encryptedBuf);
    // save it to local upload directory, 
    console.log("Path:", path.join('./upload', newHashId))
    try {
        let result = await writeFile(path.join('./upload', newHashId), encryptedBuf)
        console.log(result);
        console.log("write OK")
    } catch (e) {
        console.log("write failed")
    }

    // encrypt the secret with AES256, pubKey
    let pubkey = Buffer.from(inTask.pubKey, "hex");

    let newFileName = "copy_" + record.fileName

    let newSecret = await ecies(pubkey, Buffer.from(secret, 'hex'));

    // save recordCopy
    let fb = await axiosFile(url, fileInsertRecordCopy(
        inTask.hashId,
        groupId,
        newFileName,
        newHashId,
        newSecret,
    ));

    if (fb.error) {
        console.log("save to recordCopy failed")
        return null;
    }

    let copy = ((fb.data as FileRpcRsp).result.data as RspRecordCopy[])[0];
    return copy;

}
import * as util from 'util';
import * as fs from "fs";
import * as path from 'path'
const crypto = require("crypto")

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const fileName = "111.txt";

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

async function main() {
    console.log("test fs read, write")
    try {
        let buf = await readFile(path.join('./upload', fileName))
        console.log(buf);
        console.log(buf.toString())
    } catch (e) {
        console.log("read failed")
    }

    console.log("\nTest encrypt, decrypt:")
    let data = "123456789\n123456789\n123456789\n123456789\n123456789\n123456789\n123456789\n123456789\n123456789\n123456789\n"
    console.log("data:\n", data)
    let secret = crypto.randomBytes(32);

    let encrypted = encrypt(secret, Buffer.from(data));
    console.log('encrypted:', encrypted)

    let decrypted = decrypt(secret, encrypted)
    console.log('decrypted: ', decrypted)
    console.log("data\n", decrypted.toString())


    let newHashId = "1122334455"
    let bufWrite = Buffer.from([0, 1, 2, 3, 4, 5, 67, 8, 9, 0])
    /*
    console.log("Path:", path.join('./upload', newHashId))
    try {
        let result = await writeFile(path.join('./upload', newHashId), bufWrite)
        console.log(result);
    } catch (e) {
        console.log("write failed")
    }*/

    try {
        let buf = await readFile(path.join('./upload', newHashId))
        console.log(buf);
        console.log(buf.toString('hex'))
    } catch (e) {
        console.log("read failed")
    }
}
main();
import * as util from 'util';
import * as fs from "fs";
import * as path from 'path'
const crypto = require("crypto")

const readFile = util.promisify(fs.readFile);

const fileName = "111.txt";

async function main() {
    console.log("test fs read, write")
    try {
        let buf = await readFile(path.join('./upload', fileName))
        console.log(buf);
        console.log(buf.toString())
    } catch (e) {
        console.log("read failed")
    }

    console.log('generate a 256 random key()')
    const bufSecret = crypto.randomBytes(32);
    console.log("bufSecret len: ", bufSecret.length)
    console.log(bufSecret);
    console.log(bufSecret.toString('hex'))

}
main();
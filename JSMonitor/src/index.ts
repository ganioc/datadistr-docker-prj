import { getRecordCopyFile, getRecordFile, getUserFile, insertRecordCopyFile } from "./api/fileapi";
import { getCertainOutTask, getOneInTask, insertOutTask, markInTask } from "./api/taskapi";
import { RspGroup } from "./interface/file";
import { matchGroupId } from "./jsonrpc/generic";
import { DelayMs } from "./utils";

const LOOP_DELAY = (process.env.LOOP_DELAY == undefined) ? 10000 : parseInt(process.env.LOOP_DELAY);
const TASK_HOST = (process.env.TASK_HOST === undefined) ? "192.168.0.199" : process.env.TASK_HOST;
const TASK_PORT = (process.env.TASK_PORT === undefined) ? 3000 : process.env.TASK_PORT;
const TASK_URL = (process.env.TASK_URL === undefined) ? "/tasks/rpc/v2/" : process.env.TASK_URL;

const FILE_HOST = (process.env.FILE_HOST === undefined) ? "192.168.0.199" : process.env.FILE_HOST;
const FILE_PORT = (process.env.FILE_PORT === undefined) ? 3001 : process.env.FILE_PORT;
const FILE_URL = (process.env.TASK_URL === undefined) ? "/rpc/v2/" : process.env.FILE_URL;

const T_URL = "http://" + TASK_HOST + ":" + TASK_PORT + TASK_URL;
const F_URL = "htpp://" + FILE_HOST + ":" + FILE_PORT + FILE_URL;

console.log("=====================================")
console.log("LOOP_DELAY:", LOOP_DELAY);
console.log("TASK_HOST:", TASK_HOST)
console.log("TASK_PORT:", TASK_PORT)
console.log("TASK_URL:", TASK_URL)
console.log("FILE_HOST:", FILE_HOST);
console.log("FILE_PORT:", FILE_PORT);
console.log("FILE_URL:", FILE_URL)
console.log("T_URL:", T_URL);
console.log("F_URL:", F_URL)
console.log("=====================================")

async function main() {
    console.log('hello, JSMonitor ...');

    async function app() {
        console.log("\nCheck InTask ...")
        let inTask = await getOneInTask(T_URL);

        if (inTask === null) {
            console.log("No more inTask found!\n")
            await DelayMs(LOOP_DELAY);
            await app();
            return;
        }

        console.log("User address:", inTask.address);
        console.log("hashId:", inTask.hashId);

        console.log("\nCheck user's group")
        let fileUser = await getUserFile(F_URL, inTask.address);

        if (fileUser === null) {
            console.log("user not registered!\n", inTask.address);
            await DelayMs(LOOP_DELAY);
            await app();
            return;
        }

        let userGroups: RspGroup[] = fileUser.groups;

        console.log("\nCheck record's group")
        let record = await getRecordFile(F_URL, inTask.hashId);
        if (record === null) {
            console.log("record not found", inTask.hashId)
            await DelayMs(LOOP_DELAY)
            await app();
            return;
        }
        let recordGroups: RspGroup[] = record.groups;

        let groupId = matchGroupId(userGroups, recordGroups);

        if (groupId == -1) {
            console.log("user dont has permission to read the record!\n");
            await DelayMs(LOOP_DELAY)
            await app();
            return;
        }

        console.log("user's groupId: ", groupId)

        console.log("\ncheck recordCopy ...")
        let recordCopy = await getRecordCopyFile(F_URL, inTask.hashId, groupId);

        if (recordCopy == null) {
            console.log("Insert new recordCopy, according to inTask")
            recordCopy = await insertRecordCopyFile(F_URL, inTask, record, groupId);

        }
        console.log("return recordCopy")
        if (recordCopy === null) {
            console.log("insertRecordCopy fail")
            await DelayMs(LOOP_DELAY)
            await app();
            return;
        }

        // insert new OutTask
        // add outTask
        // check outTask exist, block, 
        console.log("\nCreate OutTask ...")
        console.log("\nCheck OutTask with address , hashId:")
        let block = inTask.block;
        let txIndex = inTask.txIndex;

        let outTask = await getCertainOutTask(T_URL, block, txIndex, inTask.address, inTask.hashId);

        let bInsert;
        if (outTask === null) {
            console.log("outTask not exists\n")
            bInsert = await insertOutTask(T_URL, block, txIndex, inTask.address, inTask.hashId, inTask.pubKey, 0, recordCopy.secret, recordCopy.newHashId);
        }

        // Mark inTask finished=true
        if (outTask || bInsert) {
            let bMark = await markInTask(T_URL, block, txIndex, inTask.address, inTask.hashId);
            if (bMark) {
                console.log("mark inTask OK")
            } else {
                console.log("mark inTask Fail")
            }
        }

        await DelayMs(LOOP_DELAY);

        await app();
    }

    await app();
}

main();
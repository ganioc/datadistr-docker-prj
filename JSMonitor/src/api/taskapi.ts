import { axiosTask } from "../axios.wrapper";
import { InTask, TaskRpcRsp, TaskRpcRspErr } from "../interface/task";
import { taskGetInTask } from "../jsonrpc/task";


export async function getOneInTask(url: string): Promise<InTask | null> {
    let fb = await axiosTask(url, taskGetInTask());
    // console.log("fb:")
    // console.log(fb);
    if (fb.result) {
        let inTask = ((fb.data as TaskRpcRsp).result.data as InTask[])[0];
        // console.log(data);
        // let inTask = data[0];
        console.log(inTask)
        return inTask;
    }
    else {
        let data = fb.data as TaskRpcRspErr;
        console.log(data.error.message)
        return null;
    }
}
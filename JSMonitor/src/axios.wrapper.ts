import axios from 'axios';
import { STATUS_CODES } from 'http';
import { FileRpcRsp, FileRpcRspErr, RpcStatusCode as FileStatusCode, } from './interface/file';
import { RpcStatusCode as TaskStatusCode } from "./interface/task"
import { TaskRpcRsp, TaskRpcRspErr } from './interface/task';

axios.defaults.timeout = 10000

export type StatusCode = FileStatusCode | TaskStatusCode;

export type GenericRpcRsp = {
    result: boolean;
    error: boolean;
    data: FileRpcRsp | FileRpcRspErr | TaskRpcRsp | TaskRpcRspErr;
}

export const axiosHello = function () {
    console.log('Hello from axios.')
}

export class IfRspAny {
    error: number;
    data: any;
}

export const axiosPost = async function (url: string, data: any): Promise<any> {

    try {
        let result = await axios.post(url, data, {
        })
        // console.log('axiosPost:')
        // console.log(result);

        return result.data
    } catch (e) {
        return {
            id: -1,
            jsonrpc: "2.0",
            error: {
                code: STATUS_CODES.TIMEOUT,
                message: "timeout",
                data: []
            }
        }
    }
}
export const axiosFile = async function (url: string, data: any): Promise<GenericRpcRsp> {
    let result = await axiosPost(url, data);
    if (result.result) {
        return {
            result: true,
            error: false,
            data: result as FileRpcRsp,
        }
    } else {
        return {
            result: false,
            error: true,
            data: result as FileRpcRspErr,
        }
    }
}

export const axiosTask = async function (url: string, data: any): Promise<GenericRpcRsp> {
    let result = await axiosPost(url, data);
    if (result.result) {
        return {
            result: true,
            error: false,
            data: result as TaskRpcRsp,
        }
    } else {
        return {
            result: false,
            error: true,
            data: result as TaskRpcRspErr,
        }
    }
}
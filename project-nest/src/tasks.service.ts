import { Injectable } from "@nestjs/common";
import { stat } from "fs";
import { Connection, MongoRepository } from "typeorm";
import { InTaskModel } from "./entity/InTaskModel";
import { OutTaskModel } from "./entity/OutTaskModel";
import { StateModel } from "./entity/StateModel";
import {
    GetState,
    GetTask,
    InTask,
    MarkInTask,
    MarkOutTask,
    OutTask,
    QueryInTask,
    QueryOutTask,
    RpcReq,
    RpcRsp,
    RpcRspErr,
    RpcStatusCode,
    SetState,
    transInTaskModel,
    transOutTaskModel,
} from "./model/reqrsp.dto";

@Injectable()
export class TasksService {
    private inTaskModelRepository: MongoRepository<InTaskModel>;
    private outTaskModelRepository: MongoRepository<OutTaskModel>;
    private stateModelRepository: MongoRepository<StateModel>;

    constructor(private readonly connection: Connection) {
        this.inTaskModelRepository =
            this.connection.getMongoRepository(InTaskModel);
        this.outTaskModelRepository =
            this.connection.getMongoRepository(OutTaskModel);
        this.stateModelRepository =
            this.connection.getMongoRepository(StateModel);
    }

    findAll(
        repos: MongoRepository<InTaskModel> | MongoRepository<OutTaskModel>,
    ): Promise<InTaskModel[] | OutTaskModel[]> {
        return repos.find();
    }
    findAllInTask(): Promise<InTaskModel[] | OutTaskModel[]> {
        return this.findAll(this.inTaskModelRepository);
    }
    findAllOutTask(): Promise<OutTaskModel[] | InTaskModel[]> {
        return this.findAll(this.outTaskModelRepository);
    }

    // findAllOutTaskModel(): Promise<OutTaskModel[]> {
    //     return this.outTaskModelRepository.find();
    // }
    async exist(
        repos: MongoRepository<InTaskModel> | MongoRepository<OutTaskModel>,
        block: number,
        txIndex: number,
    ): Promise<boolean> {
        // const result = await repos
        //     .createQueryBuilder()
        //     .where('block = :block', { block: `${block}` })
        //     .andWhere('txIndex = :txIndex', { txIndex: `${txIndex}` })
        //     .getOne();
        const result = await repos.findOne({
            block: block,
            txIndex: txIndex,
        });

        if (result) {
            return true;
        } else {
            return false;
        }
    }
    async existInTask(block: number, txIndex: number): Promise<boolean> {
        return this.exist(this.inTaskModelRepository, block, txIndex);
    }
    async existOutTask(block: number, txIndex: number): Promise<boolean> {
        return this.exist(this.outTaskModelRepository, block, txIndex);
    }
    makeRspV2(req: RpcReq, data: any): RpcRsp {
        return {
            id: req.id,
            jsonrpc: "2.0",
            result: {
                name: req.method,
                data: data,
            },
        };
    }
    makeRspErrV2(
        req: RpcReq,
        code: number,
        message: string,
        data: any,
    ): RpcRspErr {
        return {
            id: req.id,
            jsonrpc: "2.0",
            error: {
                code: code,
                message: message,
                data: data,
            },
        };
    }
    async handleUnknownReq(req: RpcReq): Promise<RpcRspErr> {
        // return this.makeRspV2(req, []);
        return this.makeRspErrV2(
            req,
            RpcStatusCode.METHOD_NOT_FOUND,
            "Unknown " + req.method,
            [],
        );
        // return {
        //     id: req.id,
        //     name: req.name,
        //     statusCode: RpcStatusCode.UNKNOWN,
        //     data: [],
        // };
    }
    async handleGetInTask(req: RpcReq): Promise<RpcRsp> {
        const result = await this.inTaskModelRepository.findOne({
            finished: false,
            order: { block: "ASC" },
        });
        console.log("handleGetInTask");
        console.log(result);

        return this.makeRspV2(
            req,
            result !== undefined ? [transInTaskModel(result)] : [],
        );
    }
    async handleGetOutTask(req: RpcReq): Promise<RpcRsp> {
        const result = await this.outTaskModelRepository.findOne({
            finished: false,
            order: { block: "ASC" },
        });
        console.log("handleGetOutTask");
        console.log(result);

        return this.makeRspV2(
            req,
            result !== undefined ? [transOutTaskModel(result)] : [],
        );
    }
    async handleQueryInTask(req: RpcReq): Promise<RpcRsp> {
        const data = req.params as QueryInTask;

        const queryString: any = {
            take: data.pageSize <= 30 ? data.pageSize : 30,
            skip: data.pageOffset >= 0 ? data.pageOffset : 0,
        };

        if (data.all === false) {
            queryString.where = { finished: data.finished };
        }
        queryString.order = { block: "DESC" };
        console.log("queryString:", queryString);

        const [result, num] = await this.inTaskModelRepository.findAndCount(
            queryString,
        );
        console.log("result:", result);
        console.log("num:", num);

        return this.makeRspV2(req, {
            pageOffset: data.pageOffset,
            pageSize: data.pageSize,
            total: num,
            finished: data.finished,
            all: data.all,
            data:
                result.length <= 0
                    ? []
                    : result.map((item) => transInTaskModel(item)),
        });
    }
    async handleQueryOutTask(req: RpcReq): Promise<RpcRsp> {
        const data = req.params as QueryOutTask;

        const queryString: any = {
            take: data.pageSize <= 30 ? data.pageSize : 30,
            skip: data.pageOffset >= 0 ? data.pageOffset : 0,
        };

        if (data.all === false) {
            queryString.where = { finished: data.finished };
        }
        queryString.order = { block: "DESC" };
        console.log("queryString:", queryString);

        const [result, num] = await this.outTaskModelRepository.findAndCount(
            queryString,
        );
        console.log("result:", result);
        console.log("num:", num);

        return this.makeRspV2(req, {
            pageOffset: data.pageOffset,
            pageSize: data.pageSize,
            total: num,
            finished: data.finished,
            all: data.all,
            data:
                result.length <= 0
                    ? []
                    : result.map((item) => transOutTaskModel(item)),
        });
    }
    async handleInsertInTask(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        console.log("handleInsertInTask");
        const data = req.params as InTask;

        const task: InTaskModel = new InTaskModel();
        task.finished = data.finished;
        task.id = new Date().getTime();
        task.block = data.block;
        task.txIndex = data.txIndex;
        task.address = data.address;
        task.pubKey = data.pubKey;
        task.hashId = data.hashId;

        const check = await this.existInTask(data.block, data.txIndex);

        if (check) {
            return this.makeRspErrV2(
                req,
                RpcStatusCode.EXIST as number,
                "Exists",
                [],
            );
        }

        const result = await this.connection.manager.save(task);
        console.log("result: ", result);

        if (result.id !== undefined) {
            return this.makeRspV2(req, [data]);
        } else {
            return this.makeRspErrV2(
                req,
                RpcStatusCode.DB_FAIL,
                "Save task to db",
                [],
            );
        }
    }
    async handleInsertOutTask(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const task: OutTaskModel = new OutTaskModel();
        const data = req.params as OutTask;

        task.finished = data.finished;
        task.id = new Date().getTime();
        task.block = data.block;
        task.txIndex = data.txIndex;
        task.address = data.address;
        task.pubKey = data.pubKey;
        task.status = data.status;
        task.encryptSecret = data.encryptSecret;
        task.oldHashId = data.oldHashId;
        task.newHashId = data.newHashId;

        const check = await this.existOutTask(data.block, data.txIndex);

        if (check) {
            return this.makeRspErrV2(req, RpcStatusCode.EXIST, "Exist", [data]);
        }
        console.log("task:", task);

        const result = await this.connection.manager.save(task);
        console.log("result: ", result);

        if (result.id !== undefined) {
            return this.makeRspV2(req, []);
        } else {
            return this.makeRspErrV2(
                req,
                RpcStatusCode.DB_FAIL,
                "Save db fail",
                [],
            );
        }
    }
    async handleMarkInTask(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as MarkInTask;

        const result = await this.inTaskModelRepository.findOneAndUpdate(
            {
                block: data.block,
                txIndex: data.txIndex,
            },
            { $set: { finished: true } },
        );
        console.log("result", result);
        return this.makeRspV2(req, []);
    }
    async handleMarkOutTask(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as MarkOutTask;

        const result = await this.outTaskModelRepository.findOneAndUpdate(
            {
                block: data.block,
                txIndex: data.txIndex,
            },
            { $set: { finished: true } },
        );
        console.log("result", result);
        return this.makeRspV2(req, []);
    }
    async handleGetCertainInTask(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as GetTask;

        const result = await this.inTaskModelRepository.findOne({
            address: data.address,
            hashId: data.hashId,
        });
        console.log(result);
        if (result) {
            return this.makeRspV2(req, [transInTaskModel(result)]);
        } else {
            return this.makeRspErrV2(req, RpcStatusCode.EMPTY, "Empty", []);
        }
    }
    async handleGetCertainOutTask(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as GetTask;

        const result = await this.outTaskModelRepository.findOne({
            address: data.address,
            oldHashId: data.hashId,
        });
        console.log(result);
        if (result) {
            return this.makeRspV2(req, [transOutTaskModel(result)]);
        } else {
            return this.makeRspErrV2(req, RpcStatusCode.EMPTY, "Empty", []);
        }
    }
    async handleDeleteAllInTask(req: RpcReq): Promise<RpcRsp> {
        await this.inTaskModelRepository.deleteMany({});
        return this.makeRspV2(req, []);
    }
    async handleDeleteAllOutTask(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        await this.outTaskModelRepository.deleteMany({});
        return this.makeRspV2(req, []);
    }
    async handleGetState(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as GetState;

        const result = await this.stateModelRepository.findOne({
            index: data.id,
        });
        console.log(result);

        if (result) {
            return this.makeRspV2(req, result);
        } else {
            return this.makeRspErrV2(req, RpcStatusCode.EMPTY, "Empty", [data]);
        }
    }
    async handleSetState(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as SetState;

        const state = new StateModel();
        state.index = data.id;
        state.latestBlock = data.latestBlock;
        state.latestTxIndex = data.latestTxIndex;

        const result = await this.stateModelRepository.save(state);

        if (result.id !== undefined) {
            return this.makeRspV2(req, []);
        } else {
            return this.makeRspErrV2(
                req,
                RpcStatusCode.DB_FAIL,
                "Save db fail",
                [],
            );
        }
    }
    async apiRpcV1(req: RpcReq): Promise<RpcRsp | RpcRspErr | null> {
        // console.log('id:', req.id);
        // console.log('name:', req.name);

        switch (req.method) {
            // Only return one task
            case "GetInTask":
                return this.handleGetInTask(req);
                break;
            // Only return one task
            case "GetOutTask":
                return this.handleGetOutTask(req);
                break;
            case "QueryInTask":
                return this.handleQueryInTask(req);
                break;
            case "QueryOutTask":
                return this.handleQueryOutTask(req);
                break;
            case "InsertInTask":
                return this.handleInsertInTask(req);
                break;
            case "InsertOutTask":
                return this.handleInsertOutTask(req);
                break;
            case "MarkInTask":
                return this.handleMarkInTask(req);
                break;
            case "MarkOutTask":
                return this.handleMarkOutTask(req);
                break;
            case "GetCertainInTask":
                return this.handleGetCertainInTask(req);
                break;
            case "GetCertainOutTask":
                return this.handleGetCertainOutTask(req);
                break;
            case "DeleteAllInTask":
                return this.handleDeleteAllInTask(req);
                break;
            case "DeleteAllOutTask":
                return this.handleDeleteAllOutTask(req);
                break;
            case "GetState":
                return this.handleGetState(req);
                break;
            case "SetState":
                return this.handleSetState(req);
                break;
            default:
                break;
        }
        return this.handleUnknownReq(req);
    }
}

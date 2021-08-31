import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, MongoRepository, Repository } from 'typeorm';
import { InTaskModel } from './entity/InTaskModel';
import { OutTaskModel } from './entity/OutTaskModel';
import {
    GetTask,
    InTask,
    MarkInTask,
    MarkOutTask,
    OutTask,
    QueryInTask,
    QueryOutTask,
    RpcReq,
    RpcRsp,
    RpcStatusCode,
    transInTaskModel,
    transOutTaskModel,
} from './model/reqrsp.dto';

@Injectable()
export class TasksService {
    private inTaskModelRepository: MongoRepository<InTaskModel>;
    private outTaskModelRepository: MongoRepository<OutTaskModel>;

    constructor(private readonly connection: Connection) {
        this.inTaskModelRepository =
            this.connection.getMongoRepository(InTaskModel);
        this.outTaskModelRepository =
            this.connection.getMongoRepository(OutTaskModel);
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
    async handleUnknownReq(req: RpcReq): Promise<RpcRsp> {
        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.UNKNOWN,
            data: [],
        };
    }
    async handleGetInTask(req: RpcReq): Promise<RpcRsp> {
        const result = await this.inTaskModelRepository.findOne({
            finished: false,
        });
        console.log('handleGetInTask');
        console.log(result);

        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: result !== undefined ? [transInTaskModel(result)] : [],
        };
    }
    async handleGetOutTask(req: RpcReq): Promise<RpcRsp> {
        const result = await this.outTaskModelRepository.findOne({
            finished: false,
        });
        console.log('handleGetOutTask');
        console.log(result);

        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: result !== undefined ? [transOutTaskModel(result)] : [],
        };
    }
    async handleQueryInTask(req: RpcReq): Promise<RpcRsp> {
        const data = req.data as QueryInTask;

        const queryString: any = {
            take: data.pageSize <= 30 ? data.pageSize : 30,
            skip: data.pageOffset >= 0 ? data.pageOffset : 0,
        };

        if (data.all === false) {
            queryString.where = { finished: data.finished };
        }
        console.log('queryString:', queryString);

        const [result, num] = await this.inTaskModelRepository.findAndCount(
            queryString,
        );
        console.log('result:', result);
        console.log('num:', num);

        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: {
                pageOffset: data.pageOffset,
                pageSize: data.pageSize,
                total: num,
                finished: data.finished,
                all: data.all,
                data:
                    result.length <= 0
                        ? []
                        : result.map((item) => transInTaskModel(item)),
            },
        };
    }
    async handleQueryOutTask(req: RpcReq): Promise<RpcRsp> {
        const data = req.data as QueryOutTask;

        const queryString: any = {
            take: data.pageSize <= 30 ? data.pageSize : 30,
            skip: data.pageOffset >= 0 ? data.pageOffset : 0,
        };

        if (data.all === false) {
            queryString.where = { finished: data.finished };
        }
        console.log('queryString:', queryString);

        const [result, num] = await this.outTaskModelRepository.findAndCount(
            queryString,
        );
        console.log('result:', result);
        console.log('num:', num);

        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: {
                pageOffset: data.pageOffset,
                pageSize: data.pageSize,
                total: num,
                finished: data.finished,
                all: data.all,
                data:
                    result.length <= 0
                        ? []
                        : result.map((item) => transOutTaskModel(item)),
            },
        };
    }
    async handleInsertInTask(req: RpcReq): Promise<RpcRsp> {
        console.log('handleInsertInTask');
        const data = req.data as InTask;

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
            return {
                id: req.id,
                name: req.name,
                statusCode: RpcStatusCode.EXIST,
                data: [],
            };
        }

        const result = await this.connection.manager.save(task);
        console.log('result: ', result);

        return {
            id: req.id,
            name: req.name,
            statusCode:
                result.id !== undefined ? RpcStatusCode.OK : RpcStatusCode.FAIL,
            data: [data],
        };
    }
    async handleInsertOutTask(req: RpcReq): Promise<RpcRsp> {
        const task: OutTaskModel = new OutTaskModel();
        const data = req.data as OutTask;

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
            return {
                id: req.id,
                name: req.name,
                statusCode: RpcStatusCode.EXIST,
                data: [data],
            };
        }
        console.log('task:', task);

        const result = await this.connection.manager.save(task);
        console.log('result: ', result);

        return {
            id: req.id,
            name: req.name,
            statusCode:
                result.id !== undefined ? RpcStatusCode.OK : RpcStatusCode.FAIL,
            data: [],
        };
    }
    async handleMarkInTask(req: RpcReq): Promise<RpcRsp> {
        const data = req.data as MarkInTask;

        const result = await this.inTaskModelRepository.findOneAndUpdate(
            {
                block: data.block,
                txIndex: data.txIndex,
            },
            { finished: true },
        );
        console.log('result', result);

        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: [],
        };
    }
    async handleMarkOutTask(req: RpcReq): Promise<RpcRsp> {
        const data = req.data as MarkOutTask;

        const result = await this.outTaskModelRepository.findOneAndUpdate(
            {
                block: data.block,
                txIndex: data.txIndex,
            },
            { finished: true },
        );
        console.log('result', result);

        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: [],
        };
    }
    async handleGetCertainInTask(req: RpcReq): Promise<RpcRsp> {
        const data = req.data as GetTask;

        const result = await this.inTaskModelRepository.findOne({
            block: data.block,
            txIndex: data.txIndex,
        });

        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: result ? [transInTaskModel(result)] : [],
        };
    }
    async handleGetCertainOutTask(req: RpcReq): Promise<RpcRsp> {
        const data = req.data as GetTask;

        const result = await this.outTaskModelRepository.findOne({
            block: data.block,
            txIndex: data.txIndex,
        });

        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: result ? [transOutTaskModel(result)] : [],
        };
    }
    async handleDeleteAllInTask(req: RpcReq): Promise<RpcRsp> {
        await this.inTaskModelRepository.deleteMany({});
        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: [],
        };
    }
    async handleDeleteAllOutTask(req: RpcReq): Promise<RpcRsp> {
        await this.outTaskModelRepository.deleteMany({});
        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: [],
        };
    }
    async apiRpcV1(req: RpcReq): Promise<RpcRsp | null> {
        // console.log('id:', req.id);
        // console.log('name:', req.name);

        switch (req.name) {
            // Only return one task
            case 'GetInTask':
                return this.handleGetInTask(req);
                break;
            // Only return one task
            case 'GetOutTask':
                return this.handleGetOutTask(req);
                break;
            case 'QueryInTask':
                return this.handleQueryInTask(req);
                break;
            case 'QueryOutTask':
                return this.handleQueryOutTask(req);
                break;
            case 'InsertInTask':
                return this.handleInsertInTask(req);
                break;
            case 'InsertOutTask':
                return this.handleInsertOutTask(req);
                break;
            case 'MarkInTask':
                return this.handleMarkInTask(req);
                break;
            case 'MarkOutTask':
                return this.handleMarkOutTask(req);
                break;
            case 'GetCertainInTask':
                return this.handleGetCertainInTask(req);
                break;
            case 'GetCertainOutTask':
                return this.handleGetCertainInTask(req);
                break;
            case 'DeleteAllInTask':
                return this.handleDeleteAllInTask(req);
                break;
            case 'DeleteAllOutTask':
                return this.handleDeleteAllOutTask(req);
                break;
            default:
                break;
        }
        return this.handleUnknownReq(req);
    }
}

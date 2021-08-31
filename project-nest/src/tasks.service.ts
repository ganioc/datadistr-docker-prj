import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, MongoRepository, Repository } from 'typeorm';
import { InTaskModel } from './entity/InTaskModel';
import { OutTaskModel } from './entity/OutTaskModel';
import {
    InTask,
    OutTask,
    RpcReq,
    RpcRsp,
    RpcStatusCode,
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

    findAll(): Promise<InTaskModel[]> {
        return this.inTaskModelRepository.find();
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
        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: [],
        };
    }
    async handleGetOutTask(req: RpcReq): Promise<RpcRsp> {
        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: [],
        };
    }
    async handleQueryInTask(req: RpcReq): Promise<RpcRsp> {
        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: [],
        };
    }
    async handleQueryOutTask(req: RpcReq): Promise<RpcRsp> {
        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: [],
        };
    }
    async handleInsertInTask(req: RpcReq): Promise<RpcRsp> {
        console.log('handleInsertInTask');
        const task: InTaskModel = new InTaskModel();
        task.finished = false;
        const data = req.data as InTask;
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
        task.finished = false;

        const data = req.data as OutTask;
        task.id = new Date().getTime();
        task.finished = false;
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
            data: [],
        };
    }
    async handleMarkInTask(req: RpcReq): Promise<RpcRsp> {
        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: [],
        };
    }
    async handleMarkOutTask(req: RpcReq): Promise<RpcRsp> {
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
            case 'GetInTask':
                return this.handleGetInTask(req);
                break;
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
            default:
                break;
        }
        return this.handleUnknownReq(req);
    }
}

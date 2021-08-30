import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { InTaskModel } from './entity/InTaskModel';
import { OutTaskModel } from './entity/OutTaskModel';
import { RpcReq, RpcRsp, RpcStatusCode } from './model/reqrsp.dto';

@Injectable()
export class TasksService {
    private inTaskModelRepository: Repository<InTaskModel>;
    private outTaskModelRepository: Repository<OutTaskModel>;

    constructor(private readonly connection: Connection) {
        this.inTaskModelRepository = this.connection.getRepository(InTaskModel);
        this.outTaskModelRepository =
            this.connection.getRepository(OutTaskModel);
    }

    findAll(): Promise<InTaskModel[]> {
        return this.inTaskModelRepository.find();
    }
    // findAllOutTaskModel(): Promise<OutTaskModel[]> {
    //     return this.outTaskModelRepository.find();
    // }
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
        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
            data: [],
        };
    }
    async handleInsertOutTask(req: RpcReq): Promise<RpcRsp> {
        return {
            id: req.id,
            name: req.name,
            statusCode: RpcStatusCode.OK,
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
        console.log('id:', req.id);
        console.log('name:', req.name);

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

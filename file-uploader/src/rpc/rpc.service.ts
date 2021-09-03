import { Injectable } from '@nestjs/common';
import { off } from 'process';
import { StatusCode } from 'src/app.utils';
import { Group } from 'src/entity/Group';
import { RecordCopy } from 'src/entity/RecordCopy';
import { RecordOrig } from 'src/entity/RecordOrig';
import { User } from 'src/entity/User';
import { DEFAULT_GROUP, DEFAULT_PAGESIZE, ReqAddGroup, ReqAddUser, ReqDelGroup, ReqGetGroup, ReqGetGroups, ReqGetUsers, RpcReq, RpcRsp, RpcRspData } from 'src/interface/interface';
import { Connection, createQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class RpcService {
    private recordOrigRepository: Repository<RecordOrig>;
    private recordCopyRepository: Repository<RecordCopy>;
    private groupRepository: Repository<Group>;
    private userRepository: Repository<User>;

    constructor(private readonly connection: Connection) {
        this.recordOrigRepository = this.connection.getRepository(RecordOrig);
        this.recordCopyRepository = this.connection.getRepository(RecordCopy);
        this.groupRepository = this.connection.getRepository(Group);
        this.userRepository = this.connection.getRepository(User);
    }
    makeRpcRsp(req: RpcReq, code: StatusCode, data: RpcRspData): RpcRsp {
        return {
            id: req.id,
            name: req.name,
            statusCode: code,
            data: data
        }
    }
    async handleAddGroup(req: RpcReq): Promise<RpcRsp> {
        const group = new Group();
        const data = req.data as ReqAddGroup;

        if (data.groupId <= DEFAULT_GROUP) {
            return {
                id: req.id,
                name: req.name,
                statusCode: StatusCode.WRONG_ARG,
                data: []
            };
        }
        group.groupId = data.groupId;
        group.alias = data.alias;
        group.level = data.level;
        group.date = new Date();

        const result = await this.groupRepository.manager.save(group);
        return {
            id: req.id,
            name: req.name,
            statusCode: StatusCode.OK,
            data: [result]
        }
    }
    async handleGetGroup(req: RpcReq): Promise<RpcRsp> {
        const data = req.data as ReqGetGroup;
        console.log('handleGetGroup')
        console.log(data)
        const result = await this.groupRepository
            .findOne({
                groupId: data.groupId,
            });
        // console.log("result: ", result);

        if (result) {
            return this.makeRpcRsp(req, StatusCode.OK, [result])
        } else {
            return this.makeRpcRsp(req, StatusCode.UNKNOWN, [])
        }
    }
    async handleGetGroups(req: RpcReq): Promise<RpcRsp> {
        console.log('handleGetGroups')
        const data = req.data as ReqGetGroups;
        const offset = data.pageOffset < 0 ? 0 : data.pageOffset;
        const size = data.pageSize > 0 && data.pageSize <= DEFAULT_PAGESIZE ? data.pageSize : 10;
        const [result, num] = await this.groupRepository
            .createQueryBuilder()
            .limit(size)
            .skip(offset)
            .getManyAndCount();
        console.log(result);
        return this.makeRpcRsp(req, StatusCode.OK, {
            pageOffset: offset,
            pageSize: size,
            total: num,
            data: result
        })
    }
    async handleDelGroup(req: RpcReq): Promise<RpcRsp> {
        const data = req.data as ReqDelGroup;

        if (data.groupId <= DEFAULT_GROUP) {
            return {
                id: req.id,
                name: req.name,
                statusCode: StatusCode.WRONG_ARG,
                data: []
            };
        }
        const result = await this.groupRepository.delete({
            groupId: data.groupId
        });
        console.log(result);
        return this.makeRpcRsp(req, StatusCode.OK, []);
    }
    async handleAddUser(req: RpcReq): Promise<RpcRsp> {
        const data = req.data as ReqAddUser;

        const user = new User();
        user.address = data.address;
        user.name = data.name;
        user.orgization = data.organization;
        user.date = new Date();
        const result = await this.userRepository.save(user);
        if (result) {
            return this.makeRpcRsp(req, StatusCode.OK, [result])
        }
    }
    async handleGetUsers(req: RpcReq): Promise<RpcRsp> {
        const data = req.data as ReqGetUsers;

        const offset = data.pageOffset < 0 ? 0 : data.pageOffset;
        const size = data.pageSize > 0 && data.pageSize <= DEFAULT_PAGESIZE ? data.pageSize : 10;
        const [result, num] = await this.userRepository
            .createQueryBuilder()
            .limit(size)
            .skip(offset)
            .getManyAndCount();
        console.log(result);

        return this.makeRpcRsp(req, StatusCode.OK, {
            pageOffset: offset,
            pageSize: size,
            total: num,
            data: result
        })

    }
    async handleUnknownReq(req: RpcReq): Promise<RpcRsp> {
        return {
            id: req.id,
            name: req.name,
            statusCode: StatusCode.UNKNOWN,
            data: [],
        };
    }

    // add all api handler here
    async handle(req: RpcReq): Promise<RpcRsp> {
        try {
            switch (req.name) {
                case "addGroup":
                    return this.handleAddGroup(req);
                    break;
                case "getGroup":
                    return this.handleGetGroup(req);
                    break;
                case "getGroups":
                    return this.handleGetGroups(req);
                    break;
                case "delGroup":
                    return this.handleDelGroup(req);
                    break;
                case "addUser":
                    return this.handleAddUser(req);
                    break;
                case "getUsers":
                    return this.handleGetUsers(req);
                    break;
                default:
                    break;
            }
            return this.handleUnknownReq(req);
        } catch (e) {
            console.log(e)
            return this.makeRpcRsp(req, StatusCode.FAIL, [])
        }

    }
}

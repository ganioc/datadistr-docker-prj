import { Injectable } from '@nestjs/common';
import { off } from 'process';
import { retry } from 'rxjs';
import { StatusCode } from 'src/app.utils';
import { Group } from 'src/entity/Group';
import { RecordCopy } from 'src/entity/RecordCopy';
import { RecordOrig } from 'src/entity/RecordOrig';
import { User } from 'src/entity/User';
import { DEFAULT_GROUP, DEFAULT_PAGESIZE, ReqAddGroup, ReqAddUser, ReqAddUserToGroup, ReqDelGroup, ReqDelRecordCopy, ReqDelUser, ReqDelUserFromGroup, ReqGetGroup, ReqGetGroups, ReqGetGroupUsers, ReqGetRecord, ReqGetRecordCopy, ReqGetRecordCopys, ReqGetRecords, ReqGetUser, ReqGetUsers, ReqInsertRecordCopy, RpcReq, RpcRsp, RpcRspData, RpcRspErr, RpcStatusCode, RspGroup } from 'src/interface/interface';
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
    makeRpcRspV2(req: RpcReq, data: RpcRspData): RpcRsp {
        return {
            id: req.id,
            jsonrpc: "2.0",
            result: {
                name: req.method,
                data: data
            }
        }
    }
    makeRpcRspErrV2(req: RpcReq, code: RpcStatusCode, message: string, data: RpcRspData): RpcRspErr {
        return {
            id: req.id,
            jsonrpc: "2.0",
            error: {
                code: code,
                message: message,
                data: data,
            }
        }
    }
    async handleAddGroup(req: RpcReq): Promise<RpcRsp | RpcRspErr> {

        const data = req.params as ReqAddGroup;

        if (data.groupId <= DEFAULT_GROUP) {
            return this.makeRpcRspErrV2(req, RpcStatusCode.WRONG_ARG, "Wrong groupId", []);
        }
        const group = new Group();
        group.groupId = data.groupId;
        group.alias = data.alias;
        group.level = data.level;
        group.date = new Date();
        group.users = [];
        group.recordOrigs = [];

        const result = await this.groupRepository.manager.save(group);
        if (result) {
            console.log(result);
            return this.makeRpcRspV2(req, [result as RspGroup]);
        } else {
            return this.makeRpcRspErrV2(req, RpcStatusCode.DB_FAIL, "Save DB fail", []);
        }
    }
    async handleGetGroup(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqGetGroup;
        console.log('handleGetGroup')
        console.log(data)
        try {
            const result = await this.groupRepository
                .findOneOrFail({
                    groupId: data.groupId,
                });
            console.log(result);
            return this.makeRpcRspV2(req, [result as RspGroup])
        } catch (e) {
            console.log(e);
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "Can not found", []);
        }
    }
    async handleGetGroups(req: RpcReq): Promise<RpcRsp> {
        console.log('handleGetGroups')
        const data = req.params as ReqGetGroups;
        const offset = data.pageOffset < 0 ? 0 : data.pageOffset;
        const size = data.pageSize > 0 && data.pageSize <= DEFAULT_PAGESIZE ? data.pageSize : 10;
        const [result, num] = await this.groupRepository
            .createQueryBuilder()
            .limit(size)
            .skip(offset)
            .getManyAndCount();
        console.log(result);
        return this.makeRpcRspV2(req, {
            pageOffset: offset,
            pageSize: size,
            total: num,
            data: result
        })
    }
    async handleGetGroupUsers(req: RpcReq): Promise<RpcRsp> {
        console.log('handleGetGroupUsers')
        const data = req.params as ReqGetGroupUsers;

        const offset = data.pageOffset < 0 ? 0 : data.pageOffset;
        const size = data.pageSize > 0 && data.pageSize <= DEFAULT_PAGESIZE ? data.pageSize : 10;

        const [result, num] = await this.connection
            .createQueryBuilder(User, 'user')
            .innerJoin('user.groups', 'group', "group.groupId = :groupId", { groupId: data.groupId })
            .limit(size)
            .skip(offset)
            .getManyAndCount();

        console.log(result);

        return this.makeRpcRspV2(req, {
            pageOffset: offset,
            pageSize: size,
            total: num,
            data: result
        })
    }
    async handleDelGroup(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqDelGroup;

        if (data.groupId <= DEFAULT_GROUP) {
            return this.makeRpcRspErrV2(req, RpcStatusCode.WRONG_ARG, "Wrong groupId", []);
        }
        const result = await this.groupRepository.delete({
            groupId: data.groupId
        });
        console.log(result);

        if (result.affected > 0) {
            return this.makeRpcRspV2(req, []);
        } else {
            return this.makeRpcRspErrV2(req, RpcStatusCode.DB_FAIL, "DB delete fail", []);
        }
    }
    async handleAddUser(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqAddUser;

        const user = new User();
        user.address = data.address;
        user.name = data.name;
        user.orgization = data.organization;
        user.date = new Date();
        user.groups = [];
        try {
            const result = await this.userRepository.save(user);
            if (result) {
                return this.makeRpcRspV2(req, [result])
            }
        } catch (e) {
            console.log(e)
            return this.makeRpcRspErrV2(req, RpcStatusCode.FAIL, "DB save fail", [])
        }
    }
    async handleGetUsers(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqGetUsers;

        const offset = data.pageOffset < 0 ? 0 : data.pageOffset;
        const size = data.pageSize > 0 && data.pageSize <= DEFAULT_PAGESIZE ? data.pageSize : 20;

        const [result, num] = await this.userRepository
            .createQueryBuilder()
            .limit(size)
            .skip(offset)
            .getManyAndCount();
        console.log(result);

        if (num > 0) {
            return this.makeRpcRspV2(req, {
                pageOffset: offset,
                pageSize: size,
                total: num,
                data: result
            })
        } else {
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "Not found", []);
        }
    }
    async handleGetUser(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqGetUser;
        try {
            const result = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.groups', 'group')
                .where("address = :address", { address: data.address })
                .getOneOrFail();
            return this.makeRpcRspV2(req, [result]);
        } catch (e) {
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "Not found", [])
        }
    }
    async handleDelUser(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqDelUser;

        const result = await this.userRepository.delete({ address: data.address })
        console.log(result)
        if (result.affected > 0) {
            return this.makeRpcRspV2(req, [result]);
        } else {
            return this.makeRpcRspErrV2(req, RpcStatusCode.DB_FAIL, "DB delete fail", []);
        }
    }
    async handleAddUserToGroup(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqAddUserToGroup;
        let user;
        try {
            user = await this.userRepository.findOneOrFail({ address: data.address });
            console.log('user', user)
        } catch (e) {
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "User not found", [])
        }
        let group;
        try {
            group = await this.groupRepository
                .createQueryBuilder('group')
                .leftJoinAndSelect('group.users', 'user')
                .where("group.groupId = :id", { id: data.groupId })
                .getOneOrFail();
            console.log('group:', group)
        } catch (e) {
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "Group not found", [])
        }

        // group.users.push(user);
        group.users = group.users ? group.users : [];

        // check if it exists?
        const exist = group.users.filter((item) => {
            item.address === user.address
        });
        console.log('exist:', exist);

        if (exist.length > 0) {
            return this.makeRpcRspErrV2(req, RpcStatusCode.EXIST, "Already exists", [])
        }

        group.users.push(user);

        const result = await this.groupRepository.manager.save(group);
        console.log("result:", result);
        if (result) {
            return this.makeRpcRspV2(req, [])
        } else {
            return this.makeRpcRspErrV2(req, RpcStatusCode.DB_FAIL, "DB save group fail", [])
        }
    }
    async handleDelUserFromGroup(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqDelUserFromGroup;

        let user;
        try {
            user = await this.userRepository.findOneOrFail({ address: data.address });
        } catch (e) {
            console.log("not found:", data.address);
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "Not found user", [])
        }
        let group;
        try {
            group = await this.groupRepository
                .createQueryBuilder('group')
                .leftJoinAndSelect('group.users', 'user')
                .where("group.groupId = :id", { id: data.groupId })
                .getOneOrFail();
        } catch (e) {
            console.log("not found:", data.groupId);
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "Not found group", [])
        }
        (group as Group).users = group.users ? group.users : [];
        group.users = group.users.filter((item) => {
            user.address !== item.address
        })
        const result = await this.groupRepository.manager.save(group);
        if (result) {
            return this.makeRpcRspV2(req, [result])
        } else {
            return this.makeRpcRspErrV2(req, RpcStatusCode.DB_FAIL, "DB save group fail", [])
        }

    }
    async handleGetRecords(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqGetRecords;

        const offset = data.pageOffset < 0 ? 0 : data.pageOffset;
        const size = data.pageSize > 0 && data.pageSize <= DEFAULT_PAGESIZE ? data.pageSize : 20;

        const [result, num] = await this.recordOrigRepository
            .createQueryBuilder()
            .limit(size)
            .skip(offset)
            .getManyAndCount();
        console.log(result);

        return this.makeRpcRspV2(req, {
            pageOffset: offset,
            pageSize: size,
            total: num,
            data: result
        })
    }
    async handleGetRecord(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqGetRecord;

        try {
            const result = await this.recordOrigRepository
                .createQueryBuilder('recordOrig')
                .where("recordOrig.hashId = :hashId", { hashId: data.hashId })
                .leftJoinAndSelect('recordOrig.groups', 'group')
                .getOneOrFail();
            console.log(result);
            return this.makeRpcRspV2(req, [result])
        } catch (e) {
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "Not found Record", [])
        }
    }
    async handleGetRecordCopys(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqGetRecordCopys;

        const offset = data.pageOffset < 0 ? 0 : data.pageOffset;
        const size = data.pageSize > 0 && data.pageSize <= DEFAULT_PAGESIZE ? data.pageSize : 20;

        const [result, num] = await this.recordCopyRepository
            .createQueryBuilder()
            .limit(size)
            .skip(offset)
            .getManyAndCount();
        console.log(result);

        if (num > 0) {
            return this.makeRpcRspV2(req, result)
        } else {
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "Not found RecordCopy", [])
        }
    }
    async handleInsertRecordCopy(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqInsertRecordCopy;

        try {
            const recordCopy = await this.recordCopyRepository
                .findOneOrFail({
                    hashId: data.hashId,
                    groupId: data.groupId
                })
            if (recordCopy) {
                return this.makeRpcRspErrV2(req, RpcStatusCode.EXIST, "RecordCopy exist", [])
            }
        } catch (e) {
            console.log("RecordCopy found")
        }

        try {
            const result = await this.recordOrigRepository
                .findOneOrFail({ hashId: data.hashId })
        } catch (e) {
            console.log("recordOrig not found")
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "RecordOrig not found", [])
        }

        const copy = new RecordCopy();
        copy.hashId = data.hashId;
        copy.newFileName = data.newFileName;
        copy.newHashId = data.newHashId;
        copy.secret = data.secret;
        copy.date = new Date();
        copy.groupId = data.groupId;

        const result1 = await this.connection.manager.save(copy);
        if (result1) {
            return this.makeRpcRspV2(req, [result1])
        } else {
            return this.makeRpcRspErrV2(req, RpcStatusCode.DB_FAIL, "DB save RecordCopy fail", [])
        }
    }
    async handleDelRecordCopy(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqDelRecordCopy;

        const result = await this.recordCopyRepository
            .delete({ hashId: data.hashId, groupId: data.groupId })
        console.log(result);

        if (result.affected > 0) {
            return this.makeRpcRspV2(req, [result])
        } else {
            return this.makeRpcRspErrV2(req, RpcStatusCode.DB_FAIL, "DB delete RecordCopy fail", [])
        }
    }
    async handleGetRecordCopy(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        const data = req.params as ReqGetRecordCopy;

        try {
            const result = await this.recordCopyRepository
                .findOneOrFail({ hashId: data.hashId, groupId: data.groupId })
            console.log(result);
            return this.makeRpcRspV2(req, [result])
        } catch (e) {
            return this.makeRpcRspErrV2(req, RpcStatusCode.EMPTY, "Not found", [])
        }
    }
    async handleUnknownReq(req: RpcReq): Promise<RpcRsp | RpcRspErr> {
        return this.makeRpcRspErrV2(req, RpcStatusCode.UNKNOWN, "method unknown", [])
    }

    // add all api handler here
    async handle(req: RpcReq): Promise<RpcRsp | RpcRspErr> {

        switch (req.method) {
            case "addGroup":
                return this.handleAddGroup(req);
                break;
            case "getGroup":
                return this.handleGetGroup(req);
                break;
            case "getGroups":
                return this.handleGetGroups(req);
                break;
            case "getGroupUsers":
                return this.handleGetGroupUsers(req);
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
            case "getUser":
                return this.handleGetUser(req);
                break;
            case "delUser":
                return this.handleDelUser(req);
                break;
            case "addUserToGroup":
                return this.handleAddUserToGroup(req);
                break;
            case "delUserFromGroup":
                return this.handleDelUserFromGroup(req);
                break;
            case "getRecords":
                return this.handleGetRecords(req);
                break;
            case "getRecord":
                return this.handleGetRecord(req);
                break;
            case "getRecordCopys":
                return this.handleGetRecordCopys(req);
                break;
            case "insertRecordCopy":
                return this.handleInsertRecordCopy(req);
                break;
            case "delRecordCopy":
                return this.handleDelRecordCopy(req);
                break;
            case "getRecordCopy":
                return this.handleGetRecordCopy(req);
                break;
            default:
                return this.handleUnknownReq(req);
                break;
        }
    }
}

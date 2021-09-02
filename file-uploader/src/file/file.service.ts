import { Injectable } from '@nestjs/common';
import { ipfsHash, StatusCode } from 'src/app.utils';
import { RecordOrig } from 'src/entity/RecordOrig';
import { Connection, Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { Group } from 'src/entity/Group';

@Injectable()
export class FileService {
    private recordOrigRepository: Repository<RecordOrig>;
    private groupRepository: Repository<Group>;

    constructor(private readonly connection: Connection) {
        this.recordOrigRepository = this.connection.getRepository(RecordOrig);
        this.groupRepository = this.connection.getRepository(Group);
    }
    async checkFileByHashId(hash: string) {
        const result = await this.recordOrigRepository.findOne({
            hashId: hash,
        });
        return {
            statusCode: result ? StatusCode.OK : StatusCode.UNKNOWN,
        };
    }
    async uploadFile(name: string, buf: Buffer) {
        const hashId = ipfsHash(buf);
        console.log('hashId: ' + hashId);

        // save to local dir
        const recordExist = await this.recordOrigRepository.findOne({
            hashId: hashId,
        });

        if (recordExist) {
            return {
                statusCode: StatusCode.EXIST,
            };
        }

        const writer = fs.createWriteStream(path.join('./upload', hashId), {
            flags: 'w',
        });

        const promiseWrite = util.promisify(writer.write.bind(writer));

        const result = await promiseWrite(buf);
        console.log('result', result);

        if (result) {
            return { statusCode: StatusCode.FAIL };
        }

        // save to database
        const record = new RecordOrig();
        record.date = new Date();
        record.fileName = name;
        record.hashId = hashId;
        record.type = 'normal';
        const group0 = await this.groupRepository.findOne({ groupId: 0 });
        record.groups = [group0];

        await this.connection.manager.save(record);

        // return hash Id
        return {
            statusCode: StatusCode.OK,
            hashId: hashId,
        };
    }
}

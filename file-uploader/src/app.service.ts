import { Injectable } from '@nestjs/common';
import { ipfsHash } from './app.utils';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { Connection, Repository } from 'typeorm';
import { RecordOrig } from './entity/RecordOrig';
import { RecordCopy } from './entity/RecordCopy';
import { Group } from './entity/Group';
import { User } from './entity/User';
import { INSTANCE_ID_SYMBOL } from '@nestjs/core/injector/instance-wrapper';

@Injectable()
export class AppService {
    private recordOrigRepository: Repository<RecordOrig>;
    private recordCopyRepository: Repository<RecordCopy>;
    private groupRepository: Repository<Group>;
    private userRepository: Repository<User>;

    constructor(private readonly connection: Connection) {
        this.recordOrigRepository = this.connection.getRepository(RecordOrig);
        this.recordCopyRepository = this.connection.getRepository(RecordCopy);
        this.groupRepository = this.connection.getRepository(Group);
        this.userRepository = this.connection.getRepository(User);

        this.initDb();
    }

    async initDb() {
        // check if groupId exists
        const result = await this.groupRepository.findOne({
            groupId: 0,
        });
        if (!result) {
            const group = new Group();
            group.groupId = 0;
            group.alias = 'default';
            group.date = new Date();
            group.level = 0;
            await this.connection.manager.save(group);
        }
    }

    getHello(): string {
        return 'Hello World! file-uploader, to upload a picture.';
    }
    async uploadFile(name: string, buf: Buffer) {
        const hashId = ipfsHash(buf);
        console.log('hashId: ' + hashId);

        // save to local dir
        const writer = fs.createWriteStream(path.join('./upload', hashId), {
            flags: 'w',
        });

        const promiseWrite = util.promisify(writer.write.bind(writer));

        const result = await promiseWrite(buf);
        console.log('result', result);

        if (result) {
            return { statusCode: -1 };
        }

        // save to database
        const record = new RecordOrig();
        record.date = new Date();
        record.fileName = name;
        record.hashId = hashId;
        record.type = 'normal';
        await this.connection.manager.save(record);

        // return hash Id
        return {
            statusCode: 0,
            hashId: hashId,
        };
    }
}

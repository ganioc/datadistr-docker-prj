import { Injectable } from '@nestjs/common';
import { StatusCode } from './app.utils';
import { Connection, Repository } from 'typeorm';
import { RecordOrig } from './entity/RecordOrig';
import { RecordCopy } from './entity/RecordCopy';
import { Group } from './entity/Group';
import { User } from './entity/User';

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
        console.log('result: ', result)
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
    // async checkFileByHashId(hashId: string) {
    //     const recordExist = await this.recordOrigRepository.findOne({
    //         hashId: hashId,
    //     });
    //     return {
    //         statusCode: recordExist ? StatusCode.OK : StatusCode.UNKNOWN,
    //     };
    // }
}

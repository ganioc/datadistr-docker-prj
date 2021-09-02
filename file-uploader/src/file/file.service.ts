import { Injectable } from '@nestjs/common';
import { StatusCode } from 'src/app.utils';
import { RecordOrig } from 'src/entity/RecordOrig';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class FileService {
    private recordOrigRepository: Repository<RecordOrig>;

    constructor(private readonly connection: Connection) {
        this.recordOrigRepository = this.connection.getRepository(RecordOrig);
    }
    async checkFileByHashId(hash: string) {
        const result = await this.recordOrigRepository.findOne({
            hashId: hash,
        });
        return {
            statusCode: result ? StatusCode.OK : StatusCode.UNKNOWN,
        };
    }
}

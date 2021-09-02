import { Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {
        // file controller
    }

    @Get(':hash')
    exist(@Param('hash') hash: string) {
        return this.fileService.checkFileByHashId(hash);
    }
}

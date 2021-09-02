import {
    Controller,
    Get,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/app.image.filter';
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

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: imageFileFilter,
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log('uploadFile');

        console.log(file);

        return this.fileService.uploadFile(file.originalname, file.buffer);
    }
}

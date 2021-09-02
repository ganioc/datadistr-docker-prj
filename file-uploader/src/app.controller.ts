import {
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from './app.image.filter';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
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

        return this.appService.uploadFile(file.originalname, file.buffer);
    }
}

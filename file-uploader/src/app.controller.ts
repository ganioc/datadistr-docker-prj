import {
    Controller,
    Get,
    Param,
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
    // @Get('exist:hash')
    // existFile(@Param('hash') hash: string) {
    //     console.log('existFile');
    //     console.log(hash);
    //     return this.appService.checkFileByHashId(hash);
    // }
}

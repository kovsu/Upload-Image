import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { AppService } from './app.service';

export const storage = diskStorage({
  destination: './uploads',
  filename: (_req, file, cb) => {
    const filename =
      path.parse(file.originalname.toLowerCase()).name.replace(/\s/g, '') +
      '-' +
      new Date().getTime();
    const extension = path.parse(file.originalname).ext;
    cb(null, `${filename}${extension}`);
  },
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  // "filedname" 对应的是 POST 提交的参数名
  @UseInterceptors(FileInterceptor('filedname', { storage }))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/*',
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return {
      statusCode: 200,
      path: file.path,
    };
  }
}

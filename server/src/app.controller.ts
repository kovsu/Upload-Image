import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  Param,
  Res,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import path = require('path');
import fs = require('fs');
import { AppService } from './app.service';

// 这里的请求拿不到 body 里面的数据，所以我在前端只能根据时间进行分类
export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
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
      // 限制输入的文件类型和大小
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/*',
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
        })
        .build({
          // 错误返回
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log(body['category']);

    return {
      // 正确返回
      statusCode: HttpStatus.OK,
      path: file.path,
    };
  }

  @Get('images/:path')
  getFile(@Param('path') path: string, @Res() res) {
    // process.cwd() 但前执行 node 的目录
    return res.sendFile(join(process.cwd(), 'uploads/' + path));
  }

  @Get('allImages')
  getAllFiles() {
    const files = fs.readdirSync(join(process.cwd(), 'uploads/'));
    return files;
  }

  @Get('delete/:path')
  deleteFile(@Param('path') path: string) {
    const files = this.getAllFiles();
    if (files.indexOf(path) === -1) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        msg: 'not such file',
      };
    } else {
      fs.unlinkSync(join(process.cwd(), 'uploads/' + path));
      return {
        statusCode: HttpStatus.OK,
        msg: 'sucessfully deleted',
      };
    }
  }
}

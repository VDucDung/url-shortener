import { ConfigService } from '@nestjs/config';
import {
  Controller,
  Post,
  Body,
  Render,
  Get,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UrlService } from '../services/url.service';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('url')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private configService: ConfigService,
  ) {}
  @Get('/list-url')
  @Public()
  @Render('list-url')
  getListUrl() {
    // Giả sử bạn có một mảng các URL trong cơ sở dữ liệu
    const urls = [
      { originalUrl: 'http://example.com/1', shortUrl: 'http://short.url/1' },
      { originalUrl: 'http://example.com/2', shortUrl: 'http://short.url/2' },
    ];
    return { urls };
  }
  @Public()
  @Post('shorten')
  @Render('index')
  async createShortUrl(@Body() createUrlDto: CreateUrlDto) {
    const url = await this.urlService.createShortUrl(createUrlDto);
    return {
      shortUrl: `${this.configService.get('URL_NAME')}/url/${url.shortUrl}`,
    };
  }
  @Public()
  @Get(':shortUrl')
  async findByShortUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ) {
    const url = await this.urlService.findByShortUrl(shortUrl);
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'URL not found' });
    }
  }
}

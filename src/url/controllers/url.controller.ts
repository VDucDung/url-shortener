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

@Controller('url')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private configService: ConfigService,
  ) {}

  @Post('shorten')
  @Render('index')
  async createShortUrl(@Body() createUrlDto: CreateUrlDto) {
    const url = await this.urlService.createShortUrl(createUrlDto);
    return {
      shortUrl: `${this.configService.get('URL_NAME')}/url/${url.shortUrl}`,
    };
  }

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

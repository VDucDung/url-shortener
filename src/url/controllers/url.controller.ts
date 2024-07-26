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
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { UrlService } from '../services/url.service';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Request, Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('urls')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private configService: ConfigService,
  ) {}

  @Get('/list-url')
  @UseGuards(JwtAuthGuard)
  async getListUrl(
    @Req() req: Request & { user: { id: string } },
    @Res() response: Response,
  ) {
    const userId = req.user?.id;
    // if (!req.user) return response.redirect('/auth/sign-in');

    const results = await this.urlService.getListUrl(userId);
    const urls = results.map((result) => ({
      urlId: result.id,
      shortUrl: `${this.configService.get('URL_NAME')}/url/${result.shortUrl}`,
      originalUrl: result.originalUrl,
    }));

    return response.json({ urls });
  }

  @Public()
  @Get('/list')
  @Render('list-url')
  async listUrl() {
    return {};
  }

  @Public()
  @Post('shorten')
  async createShortUrl(@Body() createUrlDto: CreateUrlDto) {
    const url = await this.urlService.createShortUrl(
      createUrlDto,
      createUrlDto?.userId,
    );
    return {
      shortUrl: `${this.configService.get('URL_NAME')}/url/${url.shortUrl}`,
    };
  }

  @Delete(':urlId')
  @UseGuards(JwtAuthGuard)
  async deleteUrl(@Param('urlId') urlId: string) {
    return await this.urlService.deleteUrl(urlId);
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

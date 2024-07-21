import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Public()
  @Render('index')
  async index() {
    return { shortUrl: null };
  }
}

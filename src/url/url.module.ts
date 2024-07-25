import { Module } from '@nestjs/common';
import { UrlService } from './services/url.service';
import { UrlController } from './controllers/url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Url]), AuthModule],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './entities/url.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
    private configService: ConfigService,
  ) {}

  async createShortUrl(
    createUrlDto: CreateUrlDto,
    userId?: string,
  ): Promise<Url> {
    const shortUrl = uuidv4().slice(0, 6);
    const url = this.urlRepository.create({
      ...createUrlDto,
      shortUrl,
      userId,
    });
    return this.urlRepository.save(url);
  }
  async findUrlById(id: string): Promise<Url> {
    return this.urlRepository.findOne({ where: { id: parseInt(id, 10) } });
  }
  async deleteUrl(urlId: string): Promise<Url> {
    const url = await this.findUrlById(urlId);
    if (!url) throw new Error('Url not found');
    await this.urlRepository.delete(urlId);
    return url;
  }

  async findByShortUrl(shortUrl: string): Promise<Url> {
    return this.urlRepository.findOne({ where: { shortUrl } });
  }
  async getListUrl(userId?: string): Promise<Url[]> {
    if (!userId) return [];
    return this.urlRepository.find({
      where: { userId },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Url } from '../entities/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async create(createUrlDto: CreateUrlDto): Promise<Url> {
    const shortUrl = uuidv4().slice(0, 6);
    const url = this.urlRepository.create({ ...createUrlDto, shortUrl });
    return this.urlRepository.save(url);
  }
}

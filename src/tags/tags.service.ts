import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private repo: Repository<Tag>) {}

  create(dto: CreateTagDto) { return this.repo.save(this.repo.create(dto)); }

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const tag = await this.repo.findOne({ where: { ID: id } });
    if (!tag) throw new NotFoundException(`Tag ${id} not found`);
    return tag;
  }

  async findByIds(ids: number[]) {
    return this.repo.findByIds(ids);
  }

  async update(id: number, dto: UpdateTagDto) {
    const tag = await this.findOne(id);
    Object.assign(tag, dto);
    return this.repo.save(tag);
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    await this.repo.remove(tag);
  }
}

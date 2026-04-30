import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  create(dto: CreateCommentDto) {
    return this.repo.save(this.repo.create({ ...dto, PostDate: dto.PostDate ?? new Date() }));
  }

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const c = await this.repo.findOne({ where: { ID: id } });
    if (!c) throw new NotFoundException(`Comment ${id} not found`);
    return c;
  }

  async update(id: number, dto: UpdateCommentDto) {
    const c = await this.findOne(id);
    Object.assign(c, dto);
    return this.repo.save(c);
  }

  async remove(id: number) {
    const c = await this.findOne(id);
    await this.repo.remove(c);
  }
}

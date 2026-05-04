import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  async create(dto: CreateCommentDto) {
    try {
      return await this.repo.save(this.repo.create({ ...dto, PostDate: dto.PostDate ?? new Date() }));
    } catch (e) {
      if (e instanceof QueryFailedError && (e as any).errno === 1452) {
        throw new BadRequestException(`Photo ${dto.PhotoID} not found`);
      }
      throw e;
    }
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
    await this.repo.save(c);
    return this.findOne(id);
  }

  async remove(id: number) {
    const c = await this.findOne(id);
    await this.repo.remove(c);
  }
}

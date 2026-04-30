import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(Member) private repo: Repository<Member>) {}

  create(dto: CreateMemberDto) { return this.repo.save(this.repo.create(dto)); }

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const m = await this.repo.findOne({ where: { ID: id } });
    if (!m) throw new NotFoundException(`Member ${id} not found`);
    return m;
  }

  async update(id: number, dto: UpdateMemberDto) {
    const m = await this.findOne(id);
    Object.assign(m, dto);
    return this.repo.save(m);
  }

  async remove(id: number) {
    const m = await this.findOne(id);
    await this.repo.remove(m);
  }
}

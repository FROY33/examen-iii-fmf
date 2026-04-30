import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(@InjectRepository(Location) private repo: Repository<Location>) {}

  create(dto: CreateLocationDto) { return this.repo.save(this.repo.create(dto)); }

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const loc = await this.repo.findOne({ where: { ID: id } });
    if (!loc) throw new NotFoundException(`Location ${id} not found`);
    return loc;
  }

  async update(id: number, dto: UpdateLocationDto) {
    const loc = await this.findOne(id);
    Object.assign(loc, dto);
    return this.repo.save(loc);
  }

  async remove(id: number) {
    const loc = await this.findOne(id);
    await this.repo.remove(loc);
  }
}

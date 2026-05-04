import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private repo: Repository<Album>) {}

  create(dto: CreateAlbumDto) { return this.repo.save(this.repo.create(dto)); }

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const album = await this.repo.findOne({ where: { ID: id } });
    if (!album) throw new NotFoundException(`Album ${id} not found`);
    return album;
  }

  async update(id: number, dto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    Object.assign(album, dto);
    await this.repo.save(album);
    return this.findOne(id);
  }

  async remove(id: number) {
    const album = await this.findOne(id);
    await this.repo.remove(album);
  }
}

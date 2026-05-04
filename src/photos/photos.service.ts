import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo, Privacy } from './photo.entity';
import { Tag } from '../tags/tag.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Role } from '../users/user.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private repo: Repository<Photo>,
    @InjectRepository(Tag) private tagsRepo: Repository<Tag>,
  ) {}

  async create(dto: CreatePhotoDto): Promise<Photo> {
    const { tagIds, ...rest } = dto;
    const photo = this.repo.create({ ...rest, UploadDate: new Date() });
    if (tagIds?.length) {
      photo.tags = await this.tagsRepo.findByIds(tagIds);
    }
    return this.repo.save(photo);
  }

  findAll(currentUser: { role: Role }): Promise<Photo[]> {
    if (currentUser.role === Role.USER) {
      return this.repo.find({ where: { Privacy: Privacy.PUBLIC } });
    }
    return this.repo.find();
  }

  async findOne(id: number): Promise<Photo> {
    const photo = await this.repo.findOne({ where: { ID: id } });
    if (!photo) throw new NotFoundException(`Photo ${id} not found`);
    return photo;
  }

  async update(id: number, dto: UpdatePhotoDto): Promise<Photo> {
    const photo = await this.findOne(id);
    const { tagIds, ...rest } = dto;
    Object.assign(photo, rest);
    if (tagIds !== undefined) {
      photo.tags = tagIds.length ? await this.tagsRepo.findByIds(tagIds) : [];
    }
    await this.repo.save(photo);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const photo = await this.findOne(id);
    await this.repo.remove(photo);
  }
}

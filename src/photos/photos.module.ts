import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Tag } from '../tags/tag.entity';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Tag])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}

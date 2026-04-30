import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Photo } from '../photos/photo.entity';

@Entity('Tag')
export class Tag {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ length: 120 })
  Title: string;

  @ManyToMany(() => Photo, (photo) => photo.tags)
  photos: Photo[];
}

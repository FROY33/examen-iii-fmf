import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Photo } from '../photos/photo.entity';

@Entity('Comment')
export class Comment {
  @PrimaryGeneratedColumn()
  ID: number;

  @ManyToOne(() => Photo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'PhotoID' })
  photo: Photo;

  @Column()
  PhotoID: number;

  @Column({ type: 'datetime', nullable: true })
  PostDate: Date;

  @Column({ length: 255 })
  Content: string;
}

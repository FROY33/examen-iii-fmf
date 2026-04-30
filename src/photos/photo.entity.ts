import {
  Entity, Column, PrimaryGeneratedColumn,
  ManyToOne, ManyToMany, JoinTable, JoinColumn,
} from 'typeorm';
import { Album } from '../albums/album.entity';
import { Location } from '../locations/location.entity';
import { Member } from '../members/member.entity';
import { Tag } from '../tags/tag.entity';

export enum Privacy {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

@Entity('Photo')
export class Photo {
  @PrimaryGeneratedColumn()
  ID: number;

  @ManyToOne(() => Album, { nullable: true, eager: false })
  @JoinColumn({ name: 'AlbumID' })
  album: Album;

  @Column({ nullable: true })
  AlbumID: number;

  @ManyToOne(() => Location, { nullable: true, eager: false })
  @JoinColumn({ name: 'LocationID' })
  location: Location;

  @Column({ nullable: true })
  LocationID: number;

  @ManyToOne(() => Member, { nullable: true, eager: false })
  @JoinColumn({ name: 'MemberID' })
  member: Member;

  @Column({ nullable: true })
  MemberID: number;

  @Column({ length: 120 })
  Title: string;

  @Column({ length: 255, nullable: true })
  Description: string;

  @Column({ type: 'varchar', default: Privacy.PUBLIC })
  Privacy: Privacy;

  @Column({ type: 'datetime', nullable: true })
  UploadDate: Date;

  @Column({ default: 0 })
  View: number;

  @Column({ length: 50, nullable: true })
  ImagePath: string;

  @ManyToMany(() => Tag, (tag) => tag.photos, { cascade: true, eager: true })
  @JoinTable({
    name: 'Tag_Photo',
    joinColumn: { name: 'PhotoID', referencedColumnName: 'ID' },
    inverseJoinColumn: { name: 'TagID', referencedColumnName: 'ID' },
  })
  tags: Tag[];
}

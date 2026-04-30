import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Album')
export class Album {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ length: 120 })
  Title: string;

  @Column({ length: 255, nullable: true })
  Description: string;

  @Column({ default: 0 })
  View: number;
}

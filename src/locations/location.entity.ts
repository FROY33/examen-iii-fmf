import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Location')
export class Location {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ length: 200 })
  Name: string;

  @Column({ length: 50 })
  Shortname: string;
}

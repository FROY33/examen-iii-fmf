import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Member')
export class Member {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ length: 255 })
  Name: string;

  @Column({ length: 20, nullable: true })
  PhoneNum: string;

  @Column({ length: 200, nullable: true })
  Email: string;

  @Column({ length: 255, nullable: true })
  Address: string;
}

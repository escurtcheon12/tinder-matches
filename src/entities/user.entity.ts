import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 150, nullable: false })
  username: string;

  @Column('varchar', { length: 200, nullable: false })
  email: string;

  @Column('varchar', { length: 13, nullable: false })
  phone: string;

  @Column('text', { nullable: true })
  password: string;
}

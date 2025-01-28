import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';
import { UserGender } from '../common/enums/global';

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

  @Column('tinyint', { default: UserGender.MALE })
  gender: number;

  @Column('text', { nullable: true })
  password: string;

  @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('int', { nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at : Date;

  @Column({ type: 'timestamp', default: null })
  deleted_at: Date;
}

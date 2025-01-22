import { DataSource } from 'typeorm';
import { IUserRepository } from './user.interface.repository';
import { UserEntity } from '../../../entities/user.entity';
import { Inject } from '@nestjs/common';

export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DataSource)
    private readonly dataSource: DataSource,
  ) {}

  async findByPhone(
    phone: string,
    // runner?: Runner,
  ): Promise<UserEntity> {
    try {
      let entityManager = this.dataSource.manager;
      //   if (runner) {
      //     entityManager = runner.manager;
      //   }

      // return entityManager
      //   .createQueryBuilder()
      //   .select('u.*')
      //   .from(UserEntity, 'u')
      //   .where('u.phone = :phone', { phone })
      //   .getRawOne();

      return this.dataSource
        .getRepository(UserEntity)
        .createQueryBuilder('u')
        .where('u.phone = :phone', { phone })
        .getOne();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async save(
    data: UserEntity | UserEntity[],
  ): Promise<UserEntity | UserEntity[]> {
    try {
      let entityManager = this.dataSource.manager;
      //   if (runner) {
      //     entityManager = runner.manager;
      //   }

      // return entityManager
      //   .createQueryBuilder()
      //   .select('u.*')
      //   .from(UserEntity, 'u')
      //   .where('u.phone = :phone', { phone })
      //   .getRawOne();

      // return this.dataSource
      //   .getRepository(UserEntity)
      //   .createQueryBuilder('u')
      //   .where('u.phone = :phone', { phone })
      //   .getOne();

      await entityManager.save(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

import { UserEntity } from '../../../entities/user.entity';

export interface IUserRepository {
  /**
   * Description
   * @param {any} phone:string
   * @returns {any}
   */
  findByPhone(phone: string): Promise<UserEntity>;

  /**
   * Description
   * @param {any} data:UserEntity|UserEntity[]
   * @returns {any}
   */
  save(data: UserEntity | UserEntity[]): Promise<UserEntity | UserEntity[]>;
}

export const IUserRepository = Symbol('IUserRepository');

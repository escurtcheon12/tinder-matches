import { FindAllByConnectionRequestDto } from '../dtos/user.request.dto';
import { User } from '../dtos/user.response.dto';

export interface IUserService {
  /**
   * Description
   * @param {any} request:FindAllByConnectionRequestDto
   * @returns {any}
   */
  findAllByConnection(id: number, request: FindAllByConnectionRequestDto): Promise<(User & { connection: number })[]>;
}

export const IUserService = Symbol('IUserService');




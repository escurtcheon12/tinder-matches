import { LoginRequestDto, RegisterRequestDto } from '../dtos/auth.request.dto';
import { User } from '../../user/dtos/user.response.dto';

export interface IAuthService {
  /**
   * Description
   * @param {any} request:LoginRequestDto
   * @returns {any}
   */
  login(request: LoginRequestDto): Promise<User & { token: string }>;

  /**
   * Description
   * @param {any} request:RegisterRequestDto
   * @returns {any}
   */
  register(request: RegisterRequestDto): Promise<boolean>;
}

export const IAuthService = Symbol('IAuthService');

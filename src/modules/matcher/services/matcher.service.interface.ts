export interface IMatcherService {
  findOppositesMatch(id: number): Promise<any>;
}

export const IMatcherService = Symbol('IMatcherService');

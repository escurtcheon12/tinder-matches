import { Controller } from '@nestjs/common';

@Controller('matcher')
export class MatcherController {
  constructor(private readonly matcherService: MatcherService) {}

  async handle(request: Request, response: Response): Promise<Response> {}
}

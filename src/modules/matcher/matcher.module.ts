import { Module } from '@nestjs/common';
import { EventsGateway } from './gateway/events.gateway';
import { MatcherController } from './controllers/matcher.controller';
import { IMatcherService } from './services/matcher.service.interface';
import { MatcherService } from './services/matcher.service';

@Module({
  controllers: [MatcherController],
  providers: [
    {
      provide: IMatcherService,
      useClass: MatcherService,
    },
    EventsGateway,
  ],
})
export class MatcherModule {}

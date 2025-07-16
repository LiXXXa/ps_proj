import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.model';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { UserModule } from '../users/user.module';
import { EventRegModule } from '../event-registrations/event-reg.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => EventRegModule),

  ],
  providers: [EventService, EventResolver],
  exports: [EventService],
})
export class EventModule {}

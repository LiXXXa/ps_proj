import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {EventRegistration, eventRegistrationSchema} from './event-reg.model'
import {Event, EventSchema} from '../events/event.model'
import { EventRegService } from './event-reg.service';
import { EventModule } from '../events/event.module';
import { UserModule } from '../users/user.module';
import { EventRegResolver } from './event-reg.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventRegistration.name, schema: eventRegistrationSchema },
      {name: Event.name, schema: EventSchema}
    ]),
    forwardRef(() => EventModule),
    forwardRef(() => UserModule),
  ],
  exports: [EventRegService],
  providers: [EventRegService, EventRegResolver],
})
export class EventRegModule {}

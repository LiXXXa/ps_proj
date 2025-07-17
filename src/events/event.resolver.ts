import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Event } from './event.model';
import { EventRegistration } from '../event-registrations/event-reg.model';
import { EventService } from './event.service';
import { CreateEventInput, EventInput, SearchEventsInput } from './event.inputs';
import { UserService } from '../users/user.service';
import { EventRegService } from '../event-registrations/event-reg.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentuser.decorator';
import { RegUserOnEventInput } from '../event-registrations/event-reg.inputs';



@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService,
              private readonly userService: UserService
  ) {}

  @Query(() => Event, {name: 'getEvent'})
  async event(@Args('_id', { type: () => String }) _id: string ) {
    return this.eventService.event({  _id });
  }

  @Query(() => [Event], {name: 'getEvents'})
  async events( ) {
    return this.eventService.events();
  }

  @Mutation(() => Event, { name: 'createEvent'})
  @UseGuards(JwtAuthGuard)
  async createEvent(@Args('payload', { type: () => CreateEventInput }
  ) payload: CreateEventInput, @CurrentUser() currentUser: {_id: string}) {
    return this.eventService.createEvent(payload, currentUser._id);
  }


}

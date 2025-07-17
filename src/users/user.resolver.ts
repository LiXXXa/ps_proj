import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './user.model';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentuser.decorator';
import { Event } from '../events/event.model';
import { EventService } from '../events/event.service';
import { EventRegService } from '../event-registrations/event-reg.service';



@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService,
              private readonly eventService: EventService,
              private readonly eventRegService: EventRegService,
              ) {}


  @Query(() => User, {name: 'me'})
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser()  currentUser: {_id: string, email: string, uuid: string}) {
    return this.userService.findOne({_id: currentUser._id}, 'uuid name email');
  }

  @Query(() => [Event], { name: 'myOrganizedEvents' })
  @UseGuards(JwtAuthGuard)
  async myOrganizedEvents(
    @CurrentUser() currentUser: {_id: string, uuid: string}
  ) {
    return this.eventService.events({
      organizer: currentUser._id });
  }

  @Query(() => [Event], { name: 'myRegisteredEvents' })
  @UseGuards(JwtAuthGuard)
  async myRegisteredEvents(
    @CurrentUser() currentUser: {_id: string, uuid: string}
  ) {
    const registrations = await this.eventRegService.getMyRegEvents({
      user: currentUser._id
    });

    const events = registrations.map(reg => reg.event);

    return events.filter(event => event && event.organizer);

  }





}


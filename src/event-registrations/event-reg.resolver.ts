import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from '../events/event.model';
import { EventRegistration } from './event-reg.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.quard';
import { CancelRegInput, RegUserOnEventInput } from './event-reg.inputs';
import { EventInput } from '../events/event.inputs';
import { EventRegService } from './event-reg.service';
import { UserService } from '../users/user.service';
import { CurrentUser } from '../auth/decorators/currentuser.decorator';

@Resolver(() => EventRegistration)
export class EventRegResolver {
  constructor(
    private readonly eventRegService: EventRegService
  ) {}

  @Mutation(() => EventRegistration, { name: 'registerForEvent' })
  @UseGuards(JwtAuthGuard)
  async registerForEvent(
    @Args('payload', { type: () => RegUserOnEventInput }) payload: RegUserOnEventInput,
    @CurrentUser() currentUser: {_id: string, uuid: string}
  ) {
    return this.eventRegService.register(payload, currentUser._id);
  }

  @Mutation(() => EventRegistration, { name: 'cancelRegistration' })
  @UseGuards(JwtAuthGuard)
  async cancelRegistration(
    @Args('payload', { type: () => CancelRegInput }) payload: CancelRegInput,
    @CurrentUser() currentUser: {_id: string, uuid: string}) {
    return this.eventRegService.cancelRegistration(payload, currentUser._id);
}
}

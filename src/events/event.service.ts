import { Injectable, NotFoundException } from '@nestjs/common';
import { Event, EventDocument } from './event.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventInput, EventInput, SearchEventsInput } from './event.inputs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/user.model';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async createEvent(param: CreateEventInput, organizerId: String) {
    const newUuid = uuidv4();
    const createdEvent = new this.eventModel({
      ...param,
      organizer: organizerId,
      uuid: newUuid
    });

    const savedEvent = await createdEvent.save();
    return await savedEvent.populate<{ organizer: User }>({ path:'organizer', select: 'name email uuid' });
  }

  async event(param: SearchEventsInput) {
    const event =  await this.eventModel.findOne(param).populate<{ organizer: User }>({ path:'organizer', select: 'name email uuid' }).exec();
    if (!event) {
      throw new NotFoundException('Event not found.');
    }
    return event;
  }

  async events(params?: SearchEventsInput) {
    const findQuery = {
      ...(params || {}),
      date: { $gte: new Date() },
    };
    const events =  await this.eventModel.find(findQuery).populate<{ organizer: User }>({ path:'organizer', select: 'name email uuid' }).exec();
    if (!events) {
      throw new NotFoundException('Events not found.');
    }
    return events;
  }
}

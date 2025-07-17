import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventRegistration, RegistrationStatus } from './event-reg.model';
import { CancelRegInput, RegUserOnEventInput, GetMyRegInput } from './event-reg.inputs';
import { Event, EventDocument } from '../events/event.model';
import { User, UserDocument } from '../users/user.model';


@Injectable()
export class EventRegService {
  private readonly logger = new Logger(EventRegService.name);


  constructor(
    @InjectModel(EventRegistration.name) private eventRegistrationModel: Model<EventRegistration>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>
  ) {}

  async register(regUserOnEventInput: RegUserOnEventInput, userUuid: string) {
    const { event } = regUserOnEventInput;
    console.log('regUserOnEventInput', regUserOnEventInput);
    const eventToRegister = await this.eventModel.findOne({ _id: event }).exec();
    if (!eventToRegister) {
      throw new BadRequestException('Event not found.');
    }
    if (eventToRegister.date && new Date(eventToRegister.date.toString()) < new Date()) {
      throw new BadRequestException(
        'Registration for past events is not possible.',
      );
    }
    const isAlreadyReg = await this.eventRegistrationModel.findOne({
      user: userUuid,
      event: event,
    })
    console.log('isAlreadyReg', isAlreadyReg);
    if (eventToRegister.organizer.toString() === userUuid) {
      throw new BadRequestException('You cannot register for your own event.');
    }
    if (isAlreadyReg) {
      throw new BadRequestException('You are already registered for this event.');
    }

    const registration = new this.eventRegistrationModel({
      ...regUserOnEventInput,
      event: event,
      user: userUuid,
      registrationDate: new Date().toISOString(),
    });
    const savedRegistration = await registration.save();

    this.logger.log(`You successfully registered for event ${event}. Registration ID: ${savedRegistration.uuid}`);
    return savedRegistration;
  }

  async cancelRegistration(cancelRegInput: CancelRegInput, userUuid: string) {
    const {event, cancellationReason } = cancelRegInput;
    const updatedRegistration = await this.eventRegistrationModel.findOneAndUpdate(
      {
        user: userUuid,
        event: event,
      },
      {
        $set: {
          status: RegistrationStatus.CANCELLED,
          cancellationDate: new Date().toISOString(),
          cancellationReason: cancellationReason,
        },
      },
      { new: true },
    ).populate([
      { path: 'user', select: 'name email uuid' },
      { path: 'event', populate: { path: 'organizer', select: 'name email uuid' } },
    ]).exec();

    if (!updatedRegistration) {
      throw new NotFoundException('Registration for this event not found.');
    }
    this.logger.log(`Registration for event ${event} was cancelled.`);

    return updatedRegistration;
  }

  async getMyRegEvents(getMyRegInput: GetMyRegInput) {

    const query = {
      ...getMyRegInput,
      status: RegistrationStatus.CONFIRMED,
    }
    return this.eventRegistrationModel.find(getMyRegInput)
      .populate({
        path: 'event',
        populate: {
          path: 'organizer',
          model: User.name,
          select:'name email uuid'
        },
      })
      .exec();
  }
}
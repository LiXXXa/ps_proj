import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../users/user.model';
import { Event } from '../events/event.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export enum RegistrationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  ATTENDED = 'attended',
}

@ObjectType()
@Schema({ collection: 'eventRegistrations', timestamps: true })
export class EventRegistration {
  @Field(() => User, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', nullable: true })
  user?: User;

  @Field(() => ID)
  _id: Types.ObjectId;


  @Field(() => String, { nullable: true })
  @Prop({ required: true, unique: true })
  uuid: string;

  @Field(() => Event, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Event', nullable: true })
  event: Event;

  @Field(() => String)
  @Prop({ type: String, enum: RegistrationStatus, default: 'PENDING', nullable: true })
  status: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, nullable: true })
  registrationDate: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: false, nullable: true })
  cancellationDate?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: false, nullable: true })
  cancellationReason?: string;

  @Field(() => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: false, required: false, nullable: true })
  isAttended?: boolean;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: false, nullable: true })
  attendanceDate?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: false, nullable: true })
  notes?: string;
}

export type eventRegistrationDocument = EventRegistration & Document;
export const eventRegistrationSchema = SchemaFactory.createForClass(EventRegistration);
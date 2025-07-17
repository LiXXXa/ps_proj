import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../users/user.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ collection: 'events', timestamps: true })
export class Event {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({ required: true, unique: true })
  uuid?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  title?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  description?: string;

  @Field(() => Date, { nullable: true })
  @Prop({ required: true })
  date?: Date;

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  organizer: User;
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
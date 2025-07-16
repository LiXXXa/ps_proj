import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/user.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';


@ObjectType()
@Schema({ collection: 'events', timestamps: true})
export class Event   {

  @Field(() => String, { description: 'Unique identifier for the event' })
  @Prop({
    type: String,
    unique: true,
    default: () => uuidv4(),
    required: true,
  })
  uuid?: string;

  @Field(() => String, { nullable: true })
  @Prop({required: true})
  title?: string;

  @Field(() => String, { nullable: true })
  @Prop({required: true})
  description?: string;

  @Field(() => Date, { nullable: true })
  @Prop({required: true})
  date?: Date;

  @Field(() => User)
  @Prop({ type:  MongooseSchema.Types.UUID, ref: 'User', required: true  })
  organizer: User;
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
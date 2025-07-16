import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ collection: 'events', timestamps: true})
export class Event extends Document {

  @Field(() => String, { nullable: true })
  @Prop({required: true, unique: true})
  uuid?: String;

  @Field(() => String, { nullable: true })
  @Prop({required: true})
  title?: String;

  @Field(() => String, { nullable: true })
  @Prop({required: true})
  description?: String;

  @Field(() => Date, { nullable: true })
  @Prop({required: true})
  date?: Date;

  @Field(() => User)
  @Prop({ type:  MongooseSchema.Types.ObjectId, ref: 'User', required: true  })
  organizer: User;
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
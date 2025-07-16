import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, HideField, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';


@ObjectType()
@Schema({ collection: 'users', timestamps: true})
export class User  {

  @Field(() => String, { nullable: true })
  @Prop({
    type: String,
    unique: true,
    default: uuidv4,
    required: true
  })
  uuid: String;


  @Field(() => String, {nullable: true })
  @Prop()
  name?: String;

  @Field(() => String, { nullable: true })
  @Prop({unique: true })
  email: String;


  @Field(() => String, { nullable: true })
  @Prop({required: true})
  password: string;

  @HideField()
  @Prop({ type: String, required: false, select: false })
  refreshToken?: string;

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


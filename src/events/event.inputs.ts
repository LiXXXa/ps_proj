import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class EventInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  _id: String;

  @Field(() => String)
  @IsString()
  uuid?: String;

  @IsString()
  @Field(() => String)
  title?: String;

  @IsString()
  @Field(() => String)
  description?: String;

  @IsString()
  @Field(() => Date)
  date?: String;

  @IsString()
  @Field(() => String)
  organizer: String;
}

@InputType()
export class CreateEventInput {
  @IsString()
  @Field(() => String)
  title?: String;

  @IsString()
  @Field(() => String)
  description?: String;

  @IsDate()
  @Field(() => Date)
  date?: Date;
}

@InputType()
export class SearchEventsInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  uuid?: String;


  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  _id?: String;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: String;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: String;


  @Field(() => Date, { nullable: true })
  @IsString()
  @IsOptional()
  @IsDateString()
  date?: String;


  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  organizer?: String;
}
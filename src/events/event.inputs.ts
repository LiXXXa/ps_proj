import { Field,  InputType } from '@nestjs/graphql';
import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class EventInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  _id: string;

  @Field(() => String)
  @IsString()
  @IsUUID(4)
  uuid?: string;

  @IsString()
  @Field(() => String)
  title?: string;

  @IsString()
  @Field(() => String)
  description?: string;

  @IsString()
  @Field(() => Date)
  date?: string;

  @IsString()
  @Field(() => String)
  organizer: string;
}

@InputType()
export class CreateEventInput {
  @IsString()
  @Field(() => String)
  title?: string;

  @IsString()
  @Field(() => String)
  description?: string;

  @IsDate()
  @Field(() => Date)
  date?: Date;
}

@InputType()
export class SearchEventsInput {
  @Field(() => String, { nullable: true })
  @IsUUID(4)
  @IsOptional()
  uuid?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  _id?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;


  @Field(() => Date, { nullable: true })
  @IsString()
  @IsOptional()
  @IsDateString()
  date?: string;


  @Field(() => String, {nullable: true})
  @IsOptional()
  organizer?: string;
}
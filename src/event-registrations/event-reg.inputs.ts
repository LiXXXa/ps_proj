import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum RegistrationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  ATTENDED = 'attended'
}

@InputType()
export class RegUserOnEventInput {
  @Field(() => String, {nullable: true})
  @IsOptional()
  user: String;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsNotEmpty()
  event: String;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsNotEmpty()
  status:RegistrationStatus;

  @Field(() => Date, {nullable: true})
  @IsDateString()
  @IsOptional()
  registrationDate?:Date;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsDateString()
  @IsOptional()
  cancellationDate?:String;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  cancellationReason?:String;

  @Field(() => Boolean, {nullable: true})
  @IsOptional()
  isAttended?:Boolean;

  @Field(() => Date, {nullable: true})
  @IsDateString()
  @IsOptional()
  attendanceDate?:Date;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  notes?:String;
}

@InputType()
export class CancelRegInput {
  @Field(() => String)
  @IsString()
  event: String;

  @Field(() => String, {nullable: true})
  @IsString()
  cancellationDate?:String;

  @Field(() => String, {nullable: true})
  @IsString()
  cancellationReason?:String;

  @Field(() => String, {nullable: true})
  @IsString()
  user: String;


  @Field(() => String, {nullable: true})
  @IsString()
  status:RegistrationStatus;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  notes?:String;

}

@InputType()
export class GetMyRegInput {
  @IsString()
  @Field(() => String)
  @IsOptional()
  user: String;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  event?: String;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  status?:RegistrationStatus;

  @Field(() => Date, {nullable: true})
  @IsDateString()
  @IsOptional()
  registrationDate?:Date;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsDateString()
  @IsOptional()
  cancellationDate?:String;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  cancellationReason?:String;

  @Field(() => Boolean, {nullable: true})
  @IsOptional()
  isAttended?:Boolean;

  @Field(() => Date, {nullable: true})
  @IsDateString()
  @IsOptional()
  attendanceDate?:Date;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  notes?:String;
}
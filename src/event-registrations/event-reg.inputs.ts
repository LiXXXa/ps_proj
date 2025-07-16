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
  user: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsNotEmpty()
  event: string;

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
  cancellationDate?:string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  cancellationReason?:string;

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
  notes?:string;
}

@InputType()
export class CancelRegInput {
  @Field(() => String)
  @IsString()
  event: string;

  @Field(() => String, {nullable: true})
  @IsString()
  cancellationDate?:string;

  @Field(() => String, {nullable: true})
  @IsString()
  cancellationReason?:string;

  @Field(() => String, {nullable: true})
  @IsString()
  user: string;


  @Field(() => String, {nullable: true})
  @IsString()
  status:RegistrationStatus;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  notes?:string;

}

@InputType()
export class GetMyRegInput {
  @IsString()
  @Field(() => String)
  @IsOptional()
  user: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  event?: string;

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
  cancellationDate?:string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  cancellationReason?:string;

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
  notes?:string;
}

import { Field, HideField, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';



@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

@InputType()
export class GetUserByEmailInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

@InputType()
export class UserInput {
  @Field(() => String)
  @IsNotEmpty()
  name?: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @Field(() => String)
  @IsString()
  uuid?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  _id?: string;

  @Field(() => String)
  @IsString()
  @HideField()
  @IsNotEmpty()
  password?: string;
}



@InputType()
export class LoginUserInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;
}


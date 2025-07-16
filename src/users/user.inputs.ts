
import { Field, HideField, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';



@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: String;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: String;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: String;
}

@InputType()
export class GetUserByEmailInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: String;
}

@InputType()
export class UserInput {
  @Field(() => String)
  @IsNotEmpty()
  name?: String;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: String;

  @Field(() => String)
  @IsString()
  uuid?: String;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  _id?: String;

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
  email: String;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;
}


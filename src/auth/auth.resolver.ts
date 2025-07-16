import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/user.model';
import { CreateUserInput, LoginUserInput } from '../users/user.inputs';

@ObjectType()
class AuthToken {
  @Field(() => String)
  accessToken: String;

  @Field(() => String)
  refreshToken: string;
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'signUp' })
  async createUser(
    @Args('payload', { type: () => CreateUserInput }) payload: CreateUserInput,
  ) {
    return await this.authService.signUp({
      email: payload.email,
      password: payload.password,
      name: payload.name,
    });
  }

  @Mutation(() => AuthToken, { name: 'signIn' })
  async signIn(
    @Args('payload', { type: () => LoginUserInput }) payload: LoginUserInput,
  ) {
    return await this.authService.signIn({
      email: payload.email,
      password: payload.password,
    });
  }
}

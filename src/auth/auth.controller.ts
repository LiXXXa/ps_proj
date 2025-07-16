import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginUserInput, CreateUserInput } from '../users/user.inputs';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() LoginUserInput: LoginUserInput)  {
    return this.authService.signIn(
      {
        email: LoginUserInput.email,
        password: LoginUserInput.password
      },
    );
  }


  @HttpCode(HttpStatus.CREATED)
  @Post('singUp')
  singUp(@Body() CreateUserInput: CreateUserInput) {
    return this.authService.signUp(CreateUserInput);
  }
}

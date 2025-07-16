import {
  BadRequestException,
  ConflictException, ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { CreateUserInput, LoginUserInput } from '../users/user.inputs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../users/user.model';
import * as crypto from 'crypto';


export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TKN: string;
  private readonly JWT_REFRESH_TKN: string;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async refreshTokens(uuid: string, refreshToken: string): Promise<Tokens> {

    const user = await this.usersService.findOne({ uuid }, '+refreshToken');
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const refreshTokenMatches: boolean = refreshToken === user.refreshToken
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(user);

    await this.usersService.updateRefreshToken(user.uuid, tokens.refreshToken);

    return tokens;
  }

  private async getTokens(user: UserDocument): Promise<Tokens> {
    const payload = { sub: user._id, uuid: user.uuid, email: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_TKN'),
        expiresIn: '2d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(
    LoginUserInput: LoginUserInput,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOne({
      email: LoginUserInput.email,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(
      LoginUserInput.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('User not found');
    }
    const tokens = await this.getTokens(user);
    await this.usersService.updateRefreshToken(user.uuid, tokens.refreshToken);

    const payload = { sub: user._id, email: user.email, uuid: user.uuid, refreshToken: tokens.refreshToken };

    return tokens;
  }

  async signUp(CreateUserInput: CreateUserInput) {
    const [isEmailExist] = await Promise.all([
      this.usersService.findOne({ email: CreateUserInput.email }),
    ]);
    if (isEmailExist) {
      throw new ConflictException('Email already exist');
    }

    const singup = await this.usersService.singUp(CreateUserInput);
    if (singup) this.logger.log(`User successfully registered`);
    return singup;
  }
}

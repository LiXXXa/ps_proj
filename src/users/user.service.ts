import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { User, UserDocument } from './user.model';
import * as bcrypt from 'bcrypt';
import {
  CreateUserInput,
   UserInput,
} from './user.inputs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  singUp(payload: CreateUserInput) {
    const createdUser = new this.userModel(payload);
    return createdUser.save();
  }

  async findOne(param: UserInput, select?: string) {
    return await this.userModel.findOne(param, select).exec();
  }

  async updateRefreshToken(uuid: string, refreshToken: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.userModel.updateOne(
      { uuid },
      { refreshToken: hashedRefreshToken },
    );
  }
}

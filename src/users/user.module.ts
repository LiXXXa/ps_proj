import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { EventModule } from '../events/event.module';
import { EventRegModule } from '../event-registrations/event-reg.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => EventModule),
    forwardRef(() => EventRegModule)
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}

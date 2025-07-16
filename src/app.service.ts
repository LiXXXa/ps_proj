import { Injectable, type OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';


@Injectable()
export class AppService implements OnModuleInit {

  constructor(@InjectConnection() private connection: Connection) {}

  onModuleInit() {
    console.log('MongoDB connected:', this.connection.readyState === 1);
  }
}



import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/frievent', {
      autoIndex: false,
    }),
    UsersModule,
    EventsModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}

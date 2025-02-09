import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Users', schema: UserSchema}])],
  providers: [UsersService]
})
export class UsersModule {}

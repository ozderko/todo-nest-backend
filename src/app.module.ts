import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MarkerModule } from './markers/marker.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { APP_GUARD } from '@nestjs/core';
import { WsGuard } from './chat/guards/ws.guard';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    TodoModule,
    ProjectModule,
    MarkerModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/todo', {useNewUrlParser: true}),
    AuthModule,
    UsersModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
}

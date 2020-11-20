import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './todo.schema';
import { ProjectSchema } from '../project/project.schema';


@Module({
  imports: [MongooseModule.forFeature([{name: 'Todo', schema: TodoSchema}, {name: 'Project', schema: ProjectSchema}])],
  controllers: [TodoController],
  providers: [TodoService]
})

export class TodoModule {

}

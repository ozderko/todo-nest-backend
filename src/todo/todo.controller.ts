import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../utils/decorators/current-user.decorator';

@Controller('todo')
export class TodoController {

  constructor(private todoService: TodoService) {
  };

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOne(@CurrentUser() currentUserId: string, @Body() todo: TodoDto): Promise<TodoDto[]> {
    await this.todoService.create(currentUserId, todo);
    return await this.todoService.findAll(currentUserId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@CurrentUser() currentUserId: string): Promise<TodoDto[]> {
    return await this.todoService.findAll(currentUserId);
  }

  // @Get(':id')
  // async findById(@Param() params) {
  //   return await this.todoService.findById(params.id);
  // }
  @UseGuards(AuthGuard('jwt'))
  @Get(':name')
  async findByName(@CurrentUser() currentUserId: string, @Param() param): Promise<TodoDto[]> {
    return await this.todoService.findByName(currentUserId, param.name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('selected/:id')
  async updateSelected(@CurrentUser() currentUserId: string, @Param() param): Promise<TodoDto[]> {
    return await this.todoService.updateSelected(currentUserId, param.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateColor(@CurrentUser() currentUserId: string, @Param() param, @Body() color: any): Promise<TodoDto[]> {
    return await this.todoService.updateColor(currentUserId, param.id, color.color);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteTask(@CurrentUser() currentUserId: string, @Param() param): Promise<TodoDto[]> {
    return await this.todoService.deleteTask(currentUserId, param.id);
  }
}

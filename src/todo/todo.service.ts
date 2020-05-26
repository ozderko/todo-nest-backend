import { Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private todoModel: Model<any>) {
  }

  async create(currentUserId: string, todoDto: TodoDto): Promise<void> {
    todoDto.u_id = currentUserId;
    const createdTodo = new this.todoModel(todoDto);
    await createdTodo.save();
  }

  async findAll(u_id): Promise<TodoDto[]> {
    return await this.todoModel.find({ 'u_id': u_id }).sort({ 'selected': 1 }).exec();
  }

  // async findById(id) {
  //   return this.todoModel.find({ '_id': id });
  // }

  async findByName(id: string, name: string): Promise<TodoDto[]> {
    let regex = new RegExp('^' + name);
    return await this.todoModel.find({ 'u_id': id, 'name': regex }).exec();
  }

  async updateSelected(u_id, id: string): Promise<TodoDto[]> {
    let selected = await this.todoModel.findOne({ '_id': id }).exec();
    await this.todoModel.updateOne({ '_id': id }, { 'selected': !selected.selected }).exec();
    return await this.findAll(u_id);

  }

  async updateColor(u_id: string, id: string, color: any): Promise<TodoDto[]> {
    let findColor = await this.todoModel.find({
      'u_id': u_id,
      '_id': id,
      'markers': { $elemMatch: { 'color': color } },
    });
    if (findColor.length > 0) {
      // @ts-ignore
      await this.todoModel.updateOne({ 'u_id': u_id, '_id': id }, { $pull: { 'markers': { 'color': color } } }).exec();
    } else {
      // @ts-ignore
      await this.todoModel.updateOne({ 'u_id': u_id, '_id': id }, { $push: { 'markers': { color: color } } }).exec();
    }
    return await this.findAll(u_id);
  }

  async deleteTask(u_id, id: string): Promise<TodoDto[]> {
    await this.todoModel.deleteOne({ '_id': id }).exec();
    return await this.findAll(u_id);
  }
}

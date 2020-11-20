import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private projectModel: Model<any>) {
  }

  async create(currentUserId: string, projectDto: ProjectDto): Promise<void> {
    projectDto.u_id = currentUserId;
    const createdProject = new this.projectModel(projectDto);
    await createdProject.save();
  }

  async findAll(u_id): Promise<ProjectDto[]> {
    return await this.projectModel.find({ 'u_id': u_id }).exec();
  }

  async findAllProject(u_id): Promise<ProjectDto[]> {
    return await this.projectModel.find({ 'u_id': u_id }).exec();
    //   .populate('todos').then(project => {
    //   console.log(project);
    //   return project
    // })
  }

  async taskChangeProject(u_id: string, projectData: any): Promise<ProjectDto[]> {
    // @ts-ignore
    await this.projectModel.updateOne({ '_id': projectData.projectToDelete }, { $pull: { 'todos': projectData.taskId } });
    // @ts-ignore
    await this.projectModel.updateOne({ '_id': projectData.projectToSave }, { $push: { 'todos': projectData.taskId } });
    return await this.findAll(u_id);
  }
}

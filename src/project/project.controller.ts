import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../utils/decorators/current-user.decorator';
import { TodoDto } from '../todo/todo.dto';
import { ProjectDto } from './project.dto';


@Controller('project')
export class ProjectController {

  constructor(private projectService: ProjectService) {
  };

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOne(@CurrentUser() currentUserId: string, @Body() project: ProjectDto): Promise<ProjectDto[]> {
    await this.projectService.create(currentUserId, project);
    return await this.projectService.findAll(currentUserId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@CurrentUser() currentUserId: string): Promise<ProjectDto[]> {
    return await this.projectService.findAllProject(currentUserId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async taskChangeProject(@CurrentUser() currentUserId: string, @Body() projectData: any): Promise<ProjectDto[]> {
    return await this.projectService.taskChangeProject(currentUserId, projectData);
  }
}

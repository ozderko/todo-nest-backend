import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MarkerService } from './marker.service';
import { MarkerDto } from './marker.dto';
import { CurrentUser } from '../utils/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('marker')
export class MarkerController {

  constructor(private markerService: MarkerService) {
  };

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@CurrentUser() currentUser: string, @Body() marker: MarkerDto): Promise<MarkerDto[]> {
    await this.markerService.create(currentUser, marker);
    return await this.markerService.findAll(currentUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@CurrentUser() currentUser: string): Promise<MarkerDto[]> {
    return await this.markerService.findAll(currentUser);
  }



  // @Get(':id')
  // async findById(@Param() params) {
  //   return await this.todoService.findById(params.id);
  // }
}

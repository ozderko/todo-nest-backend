import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarkerDto } from './marker.dto';

@Injectable()
export class MarkerService {
  constructor(@InjectModel('Marker') private markerModel: Model<any>) {}

  async create(currentUser: string, marker: MarkerDto): Promise<void> {
      marker.u_id = currentUser;
      const createdMarker = new this.markerModel(marker);
      await createdMarker.save();
  }

  async findAll(u_id: string): Promise<MarkerDto[]> {
      return await this.markerModel.find({'u_id': u_id}).exec();

  }
  //
  // findByName(name: string) {
  //   let regex = new RegExp('^' + name);
  //   return this.todoModel.find({'name' : regex}).exec();
  // }
}

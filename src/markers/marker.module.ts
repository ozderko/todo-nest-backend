import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';
import { MarkerSchema } from './marker.schema';


@Module({
  imports: [MongooseModule.forFeature([{name: 'Marker', schema: MarkerSchema}])],
  controllers: [MarkerController],
  providers: [MarkerService]
})

export class MarkerModule {

}

export class TodoDto {
  public _id: string;
  public u_id?: string;
  public name: string;
  public description: string;
  public selected: boolean;
  public markers: string[];

 constructor( obj) {
   this._id = obj._id;
   this.u_id = obj.u_id;
   this.name = obj.name;
   this.description = obj.description;
   this.selected = obj.selected;
   this.markers = obj.markers;
 }
}

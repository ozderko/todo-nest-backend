export class TodoDto {
  public _id: string;
  public u_id?: string;
  public name: string;
  public description: string;
  public projectId: string;
  public selected: boolean;
  public markers: string[];

 constructor( obj) {
   this._id = obj._id;
   this.u_id = obj.u_id;
   this.name = obj.name;
   this.description = obj.description;
   this.projectId = obj.projectId;
   this.selected = obj.selected;
   this.markers = obj.markers;
 }
}

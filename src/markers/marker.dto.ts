export class MarkerDto {
  public _id: string;
  public u_id?: string;
  public name: string;
  public color: string;

  constructor(obj) {
    this._id = obj._id;
    this.u_id = obj.u_id;
    this.name = obj.name;
    this.color = obj.color;
  }
}

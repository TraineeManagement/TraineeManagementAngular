import { Branch } from "./branch";


export class Location {
  public location_id!:number;
  public city!:string;
  public branches!:Branch[];
}

export class location{
  id: any;
  static reload() {
    throw new Error('Method not implemented.');
  }
  location_id?:number;
  city?:string;
}


// export class Location {
//   public locationId!:number;
//   public city!:string;
//   public branches!:Branchs[];
// }

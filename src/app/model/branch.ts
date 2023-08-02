import { Batch } from "./batch";
import { Location, location } from "./location";


// export class Branch{
//   public branch_id?:number;
//   public branch_name?:string;
//   public location?:Location;

// }


export class Branch {
  constructor(
    public branch_id?: number,
    public branch_name?: string,
    public location?:location,
    public city?:string,
    public status?: string,
    public created_by?: string,
    public created_on?: Date,
    public updated_by?: string,
    public updated_on?: Date,
    public batches?: Batch[]
  ) {}
}
export class addBranch{
  constructor(
    public location_id?:number,
    public branch_name?:string,
    public status?: string,
    public created_by?: string,
    public updated_by?: string,
  ){}
}

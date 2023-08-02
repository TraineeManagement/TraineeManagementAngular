import { Batch } from "./batch";
import { Subjects } from "./subject";


export class Course {
  public course_id?:number;
  public course_name?:string;
  public course_duration?:string;
  public course_fee?:number;
  public subjects?:Subjects[];
  public batches?:Batch[];
  // subject_name: any;
}


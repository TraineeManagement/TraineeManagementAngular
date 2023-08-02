import { Branch } from "./branch";
import { Course } from "./course";

import { Trainee } from "./trainee";


export class Batch {
  public batch_id?:number;
  public batch_name!:string;
  // public batchStartingDate!:Date;
  // public batchEndingDate!:Date;
  public branch!:Branch;
  public courses!:Course;
  trainees_ids: any;

}


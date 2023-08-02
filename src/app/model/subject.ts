import { Course } from './course';
import { Topic } from './topic';
import { Trainer } from './trainer';

export class Subjects {
  public subject_id!: number;
  public subject_name?: any;
  public trainer!: Trainer[];
  public topic_ids!: number[];
  public subject_Id!: number;
  public name?: any;
}

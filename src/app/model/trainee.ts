import { Address } from './address';
import { Batch } from './batch';

export class Trainee {
  public trainee_id!: number;
  public trainee_name!: string;
  public trainee_age!: number;
  public trainee_gender!: string;
  public trainee_phonenumber!: string;
  public trainee_email!: string;
  public address_id!: Address;
  public batch_id!: Batch;
}

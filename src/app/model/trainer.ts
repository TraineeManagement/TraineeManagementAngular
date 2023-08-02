import { Address } from './address';
import { Subjects } from './subject';

export class Trainer {
  public trainer_id?: any;
  public trainer_name?: string;
  public trainer_age!: number;
  public trainer_gender!: string;
  public trainer_phonenumber!: string;
  public triner_email!: string;
  public subjects?: Subjects[];
  public address_id!: Address;
  public created_by?: string;
  public updated_by?: string;
  public created_on?: string;
  public updated_on?: string;
}

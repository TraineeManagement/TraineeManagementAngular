export class User {
  constructor(
    public role: string,
    public branch_id: number,
    public first_name: string,
    public last_name:string,
    public email: string,
    public phone_number:number,
  ) {}

  // Add other properties as needed
}

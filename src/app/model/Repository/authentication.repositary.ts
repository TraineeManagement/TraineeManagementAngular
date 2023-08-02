import { Injectable } from "@angular/core";
import { Branch } from "../branch";
import { Batch } from "../batch";
import { RestDataSource } from "../restdatasource";
import { Observable, tap } from 'rxjs';
import { User } from "../user.model";

@Injectable()
export class AuthenticationRepository {
  public branches: Branch[] = [];
  public batches: Batch[] = [];
  private loginResponse: any;
  private localStorageKey = 'user_data';
  private user: User | undefined;
  constructor(public restdata: RestDataSource) {
    this.restdata.getBranches().subscribe((data) => {
      this.branches = data || []; // Initialize with an empty array if data is undefined
      console.log(this.branches);
    });
    this.restdata.getBatches().subscribe((data) => {
      this.batches = data || []; // Initialize with an empty array if data is undefined
      console.log(this.batches);
    });
  }

  setLoginResponse(response: any) {
    this.loginResponse = response;
  }
  getBranchId(): number | undefined {
    return this.loginResponse?.user?.branch_id;
  }

  getBranches(): Observable<Branch[]> {
    return this.restdata.getBranches().pipe(
      tap((data) => {
        this.branches = data;
        console.log(this.branches);
      })
    );
    // ...
  }

  getBatches(): Observable<Batch[]> {
    return this.restdata.getBatches().pipe(
      tap((data) => {
        this.batches = data;
        console.log(this.batches);
      })
    );
  }
  setUserData(user: User) {
    this.user = user;
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUserData(): User | undefined {
    if (!this.user) {
      const userData = localStorage.getItem(this.localStorageKey);
      this.user = userData ? JSON.parse(userData) : undefined;
    }
    return this.user;
  }
  clearUser() {
    this.user = undefined;
    localStorage.removeItem(this.localStorageKey);
  }
}

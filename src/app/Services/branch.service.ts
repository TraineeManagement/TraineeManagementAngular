import { Injectable } from '@angular/core';


import {Observable, Subject, shareReplay, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Branch, addBranch } from '../model/branch';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private locationAddedSubject = new Subject<void>();
  locationAdded$ = this.locationAddedSubject.asObservable();
  createBranch(newBranch: Branch) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) {}



  private branches: Observable<Branch[]> | undefined;
  getBranchList(): Observable<Branch[]> {
    if (!this.branches) {
      this.branches = this.httpClient
        .get<Branch[]>('http://127.0.0.1:8000/user/branchinsertandgettingall/')
        .pipe(shareReplay(1));
    }
    return this.branches;
  }
  // getBranchList(): Observable<Branch[]>{

  //   return this.httpClient.get<Branch[]>(`${this.url}`);
  // }

  deleteBranch(id: number): Observable<any> {
    const deleteUrl = `http://127.0.0.1:8000/user/branchupdateanddeleteandretraivebyid/${id}/`;
    return this.httpClient.delete(deleteUrl).pipe(
      tap(() => {
        this.locationAddedSubject.next(); // Emit value to notify subscribers
        this.branches = undefined; // Clear the cached data so that the updated data will be fetched next time
      })
    );
  }

  insertBranch(branch: addBranch): Observable<addBranch> {
    console.log('Insert branch');

    return this.httpClient
      .post<addBranch>(
        'http://127.0.0.1:8000/user/branchinsertandgettingall/',
        branch
      )
      .pipe(
        tap(() => {
          this.locationAddedSubject.next(); // Emit value to notify subscribers
          this.branches = undefined; // Clear the cached data so that the updated data will be fetched next time
        })
      );
  }

  updateBranch(
    location_id: number,
    batch_name: addBranch
  ): Observable<addBranch> {
    return this.httpClient.put<addBranch>(
      'http://127.0.0.1:8000/user/branchupdateanddeleteandretraivebyid/${branch_id}/',
      batch_name
    );
  }
}

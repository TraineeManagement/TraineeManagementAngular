import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { location } from '../model/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locationAddedSubject = new Subject<void>();
  locationAdded$ = this.locationAddedSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  private locations: Observable<location[]> | undefined;

  getLocation(): Observable<location[]> {
    if (!this.locations) {
      this.locations = this.httpClient.get<location[]>(
        'http://127.0.0.1:8000/user/locationinsertandgettingall/'
      );
    }
    return this.locations;
  }

  addLocation(city: Location): Observable<any> {
    console.log('Location added', city);
    return this.httpClient
      .post<Location>(
        'http://127.0.0.1:8000/user/locationinsertandgettingall/',
        city
      )
      .pipe(
        tap(() => {
          this.locationAddedSubject.next(); // Emit value to notify subscribers
          this.locations = undefined; // Clear the cached data so that the updated data will be fetched next time
        })
      );
  }
}

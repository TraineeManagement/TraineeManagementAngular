import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserAuthenticated: boolean = false;

  // Call this method after successful login to set the authentication status
  public setAuthenticated(status: boolean): void {
    this.isUserAuthenticated = status;
  }

  public isAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}

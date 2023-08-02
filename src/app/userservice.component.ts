
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRole: string = ''; // Placeholder for the user's role

  // Call this method after successful login to set the user's role
  public setUserRole(role: string): void {
    this.userRole = role;
  }

  public getUserRole(): string {
    return this.userRole;
  }
}

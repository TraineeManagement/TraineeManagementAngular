import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './authservice.component';
import { UserService } from './userservice.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated(); // Check if the user is authenticated

    if (isAuthenticated) {
      const userRole = this.userService.getUserRole(); // Get the user's role

      // Check if the user's role is authorized for the given route
      const allowedRoles = (route.data as { roles: string[] }).roles;
      // Get the allowed roles for the route
      const isAuthorized = allowedRoles.includes(userRole);

      if (isAuthorized) {
        return true; // Allow access to the route
      }
    }

    this.router.navigate(['/login']); // Redirect to the login page if not authenticated or authorized
    return false;
  }
}

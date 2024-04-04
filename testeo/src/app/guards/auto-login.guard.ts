import { CanMatchFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { filter, map, take } from 'rxjs/operators';

export const autoLoginGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isAuthenticated.pipe(
    filter((val) => val !== null), // Filter out initial Behaviour subject value
    take(1), // Otherwise the Observable doesn't complete!
    map((isAuthenticated) => {
      console.log('Found previous token, automatic login', isAuthenticated);
      if (isAuthenticated) {
        // Directly open inside area
        console.log("YA HICE LOGIN LOCO");
        router.navigateByUrl('/tabs', { replaceUrl: true });
        return true;
      } else {
        console.log("WHO YOU ARE MAMAHUEVO");
        // Simply allow access to the login
        return true;
      }
    })
  );
};

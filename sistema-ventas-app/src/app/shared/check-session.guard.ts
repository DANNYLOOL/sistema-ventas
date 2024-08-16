import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../pages/auth/services/auth.service';
import { map, take } from 'rxjs';

export const checkSessionGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);

  return authSrv.token$.pipe(
    take(1),
    map((token) => {
      if (token) return true;

      // Redirect al login
      return router.createUrlTree(['/login']);
    })
  );
};

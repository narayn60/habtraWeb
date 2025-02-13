import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';

export const BasicAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const credentials = authService.getCredentials();

  if (credentials) {
    // Clone the request and add the Authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Basic ${credentials}`,
      },
    });
    return next(authReq);
  }

  // If no credentials, proceed with the original request
  return next(req);
};

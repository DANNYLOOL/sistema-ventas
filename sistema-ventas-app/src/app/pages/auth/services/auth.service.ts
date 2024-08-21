import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = new BehaviorSubject<String>('');
  private tokenData = new BehaviorSubject<String | null>('');
  private isLogged = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkToken();
  }

  get token$() {
    return this.token.asObservable();
  }

  get tokenValue() {
    return this.token.getValue();
  }

  get tokenData$() {
    return this.tokenData.asObservable();
  }

  get isLogged$() {
    return this.isLogged.asObservable();
  }

  login(loginData: any) {
    return this.http.post(`${environment.API_URL}/auth`, loginData).pipe(
      map((data: any) => {
        if (data.token) {
          this.saveLocalStorage(data.token);
          this.token.next(data.token);
          this.isLogged.next(true);
          this.checkToken();
          this.router.navigate(['/home']);
        }

        return data;
      }),

      catchError((error) => this.handlerError(error))
    );
  }

  saveLocalStorage(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwt', token);
    }
  }

  logOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt');
    }

    this.token.next('');
    this.tokenData.next(null);
    this.isLogged.next(false);
    this.router.navigate(['/login']);
  }

  checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('jwt');

      if (token) {
        const isExpired = helper.isTokenExpired(token);
        if (isExpired) {
          this.logOut();
        } else {
          this.token.next(token);

          // Renovamos los datos del usuario.
          const { iat, exp, ...data } = helper.decodeToken(token);

          this.tokenData.next(data);
          this.isLogged.next(true);
        }
      } else {
        this.logOut();
      }
    }
  }

  private handlerError(error: any) {
    var errorMessage = 'Ocurrió un error';

    if (error.error) {
      if (error.error.message) errorMessage = error.error.message;
      else errorMessage = 'Ocurrió un error';
    }

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#f8d7da',
      color: '#721c24'
    });

    return throwError(() => {
      new Error(errorMessage);
    });
  }
}
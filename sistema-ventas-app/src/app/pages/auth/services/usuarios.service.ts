import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../shared/models/usuario.interface';
import { Rol } from '../../../shared/models/rol.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }
  getUsuarios() {
    return this.http.get<Usuario[]>(`${environment.API_URL}/usuarios`, {
      headers: { requireToken: 'true' },
    })
      .pipe(
        catchError((error) => this.handlerError(error))
      );
  }

  saveUsuarios(user: any) {
    return this.http.post(`${environment.API_URL}/usuarios`, user, {
      headers: { requireToken: 'true' },
    })
      .pipe(
        catchError((error) => this.handlerError(error))
      );
  }

  getRoles() {
    return this.http.get<Rol[]>(`${environment.API_URL}/roles`, {
      headers: { requireToken: 'true' },
    })
      .pipe(
        catchError((error) => this.handlerError(error))
      );
  }

  updateUsuario(id: number, user: any) {
    return this.http.put(`${environment.API_URL}/usuarios/${id}`, user, {
      headers: { requireToken: 'true' },
    })
      .pipe(
        catchError((error) => this.handlerError(error))
      );
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${environment.API_URL}/usuarios/${id}`, {
      headers: { requireToken: 'true' },
    })
      .pipe(
        catchError((error) => this.handlerError(error))
      );
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
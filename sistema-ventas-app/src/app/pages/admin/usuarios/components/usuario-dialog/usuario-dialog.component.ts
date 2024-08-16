import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosService } from '../../../../auth/services/usuarios.service';
import { Rol } from '../../../../../shared/models/rol.interface';
import Swal from 'sweetalert2';

export enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrl: './usuario-dialog.component.scss'
})
export class UsuarioDialogComponent implements OnInit, OnDestroy{
  hide = true;
  roles: Rol[] = [];
  isReadOnly = false;

  private destroy$ = new Subject<any>();
  titleButton = "Guardar";
  actionTODO = Action.NEW;
  userForm = this.fb.group({
    cveusuario: [''],
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    rol: [[], [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private usuariosSrv: UsuariosService,
    private dialogRef: MatDialogRef<UsuarioDialogComponent>,
    
  ) {}
  
  ngOnInit(): void {
    this.pathData();
    this.getRoles();
  }

  getRoles() {
    this.usuariosSrv.getRoles().subscribe((roles) => {
      this.roles = roles;
      console.log('Roles cargados:', this.roles);
    });
  }

  pathData() {
    console.log("Datos recibidos:", this.data.user);
    if (this.data.user.cveusuario) {
      this.titleButton = "Actualizar";
      this.actionTODO = Action.EDIT;
      this.isReadOnly = true;
      this.userForm.patchValue({
        cveusuario: this.data.user.cveusuario,
        nombre: this.data.user.nombre,
        apellido: this.data.user.apellido,
        username: this.data.user.username,
        email: this.data.user.email,
        rol: this.data.user.rol.map((r: Rol) => r.id),
        password: '',
        confirmPassword: ''
      });
    } else {
      this.titleButton = "Guardar";
      this.actionTODO = Action.NEW;
      this.isReadOnly = false;
    }
  }
  

  onSave() {
    if (this.userForm.invalid) return;
  
    const formValue = this.userForm.getRawValue();
  
    if (this.actionTODO === Action.NEW) {

      const password = formValue.password ?? '';
  
      if (formValue.password !== formValue.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Contraseñas no coinciden',
          text: 'Las contraseñas introducidas no coinciden.',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#f8d7da',
          color: '#721c24'
        });
        return
      }  else if (!/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La contraseña debe contener al menos una mayúscula y un carácter especial.',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#f8d7da',
          color: '#721c24'
        });
        return;
      }
  
      this.usuariosSrv.saveUsuarios(formValue).pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: 'El nuevo usuario ha sido creado exitosamente.',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#d4edda',
            color: '#155724'
          });
          this.dialogRef.close(true);
        },
        error => {
        }
      );
  
      console.log("Insert", formValue);
    } else {
      const password = formValue.password ?? '';

      if (formValue.password !== formValue.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Contraseñas no coinciden',
          text: 'Las contraseñas introducidas no coinciden.',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#f8d7da',
          color: '#721c24'
        });
        return
      }  else if (!/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La contraseña debe contener al menos una mayúscula y un carácter especial.',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#f8d7da',
          color: '#721c24'
        });
        return;
      }
      
      // Construir el objeto para la actualización
      const updateData: any = {
        nombre: formValue.nombre,
        apellido: formValue.apellido,
        rol: formValue.rol,
        password: password ? password : undefined
      };
      console.log("Updating user with ID:", this.data.user.cveusuario);
  
      this.usuariosSrv.updateUsuario(this.data.user.cveusuario, updateData).pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            text: 'El usuario ha sido actualizado exitosamente.',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#d4edda',
            color: '#155724'
          });
          this.dialogRef.close(true);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar usuario',
            text: 'Hubo un problema al actualizar el usuario. Por favor, intenta nuevamente.',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#f8d7da',
            color: '#721c24'
          });
        }
      );
  
      console.log("Update", updateData);
    }
  }

  onClear() {
    console.log("actionTODO en onClear:", this.actionTODO);
    if (this.actionTODO === Action.NEW) {
      this.userForm.reset();
    } else {
      this.userForm.patchValue({
        nombre: '',
        apellido: '',
        rol: null,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}

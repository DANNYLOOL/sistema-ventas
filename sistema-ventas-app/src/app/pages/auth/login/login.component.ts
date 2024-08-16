import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from '../../../shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;
  private destroy$ = new Subject<any>();
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {

  }

  onLogin() {
    // Verificar que el formulario sea correcto
    if (this.loginForm.invalid) return;

    // Obtener la informacion del formulario
    // y almacenarla en una variable llamada 'form'
    const form = this.loginForm.value;

    //Ejecutar el servicio para obtener los datos
    this.authSrv.login(form).pipe(takeUntil(this.destroy$)).subscribe((resp) => {});
  }

  ngOnDestroy(): void {
    console.log("method::OnDestroy");
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

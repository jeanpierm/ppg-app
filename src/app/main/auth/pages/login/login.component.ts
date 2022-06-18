import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountComponent } from '../../../account/account.component';
import { AccountService } from '../../../account/services/account.service';
import { AlertService } from '../../../../core/services/alert.service';
import { setAccountDataInLocalStorage } from '../../../../core/utils/local-storage.util';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { LoginRequest } from '../../interfaces/login-request.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  static readonly PATH = 'login';

  hide: boolean = true;
  loading: boolean = false;
  loginForm: FormGroup = this.fb.group({
    email: ['jeanpi3rm@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private route: Router,
    private readonly alertService: AlertService
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get registerRoute() {
    return `/${RegisterComponent.PATH}`;
  }

  async login() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const loginRequest: LoginRequest = {
      email: this.email?.value,
      password: this.password?.value,
    };

    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.accountService.getAccount().subscribe({
          next: ({ data }) => {
            setAccountDataInLocalStorage(data);
            this.route.navigateByUrl(`/${AccountComponent.PATH}`).then(() => {
              this.loading = false;
            });
          },
        });
      },
      error: (err) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          this.alertService.error(loginErrors[err.status]);
          return;
        }
      },
    });
  }
}

const loginErrors = {
  400: 'La contraseña o correo no son correctos. Por favor, verifique sus credenciales.',
  401: 'La contraseña o correo no son correctos. Por favor, verifique sus credenciales.',
  404: 'No se encontró su cuenta. Por favor, regístrese.',
};
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });
  
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private titleService: Title,
    private toast: HotToastService
  ) { }

  onSubmit() {
    const { email, senha } = this.loginForm.value;

    const ref = this.toast.loading('Autenticando...');

    this.authService.login(email, senha).subscribe({
      next: (response) => {
        ref.close();
        const token = response.headers.get('Authorization');
        this.authService.onLogin(token!.substring(7));
        this.router.navigate(['/']);
        this.toast.success('Seja bem-vindo!');
      },
      error: (err) => {
        this.toast.error('Email ou senha inválidos!');
        ref.close();
      }
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
  }

}

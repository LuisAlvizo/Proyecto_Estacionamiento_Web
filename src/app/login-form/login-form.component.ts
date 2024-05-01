import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const body = { username: this.username, password: this.password };
    this.http.post<any>('http://localhost:21500/admin/login', body)
      .subscribe(
        response => {
          if (response.success) {
            // Guardar token en la cookie
            document.cookie = `token=${response.token}`;
            this.router.navigate(['/admin']);
          } else {
            this.errorMessage = response.message;
          }
        },
        error => {
          console.error('Error:', error);
          this.errorMessage = 'Usuario / Contraseña incorrectos';
        }
      );
  }
}

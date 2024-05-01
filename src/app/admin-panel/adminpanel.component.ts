import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminPanelComponent {
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {
    // Validar la existencia del token al cargar el componente
    const token = this.getTokenFromCookie();
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  getTokenFromCookie(): string | null {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  }

  logout() {
    // Eliminar la cookie que contiene el token
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.router.navigate(['/login']);
  }
}

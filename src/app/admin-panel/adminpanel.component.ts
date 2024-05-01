import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminPanelComponent {
  isLoggedIn: boolean = false;
  token: string | null = null;
  errorMessage: string = '';
  selectedStartDate: string = '';
  selectedDate: string = '';
  gananciasHoy: any = null;
  entradas: number | null = null;
  ocupados: number | null = null;
  libres: number | null = null;
  gananciasDia: any = null;
  gananciasSemana: any[] = [];
  tiempoHolgura: number = 5;

  constructor(private http: HttpClient, private router: Router) {
    // Validar la existencia del token al cargar el componente
    this.token = this.getTokenFromCookie();
    if (this.token) {
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

  fetchGananciasHoy() {
    this.http.get<any>('http://localhost:21500/admin/ganancias_hoy', { headers: this.getHeaders() })
      .subscribe(
        response => {
          if (response.success) {
            this.gananciasHoy = response.ganancias;
          } else {
            this.handleError(response.error);
          }
        },
        error => {
          this.handleError('Error al obtener las ganancias del día');
          console.error('Error al obtener las ganancias del día:', error);
        }
      );
  }

  fetchEntradas() {
    this.http.get<any>('http://localhost:21500/admin/entradas', { headers: this.getHeaders() })
      .subscribe(
        response => {
          if (response.success) {
            this.entradas = response.num_entradas;
          } else {
            this.handleError(response.message);
          }
        },
        error => {
          this.handleError('Error al obtener el número de entradas');
          console.error('Error al obtener el número de entradas:', error);
        }
      );
  }

  fetchOcupados() {
    this.http.get<any>('http://localhost:21500/admin/ocupados', { headers: this.getHeaders() })
      .subscribe(
        response => {
          if (response.success) {
            this.ocupados = response.espacios_ocupados;
          } else {
            this.handleError(response.message);
          }
        },
        error => {
          this.handleError('Error al obtener el número de lugares ocupados');
          console.error('Error al obtener el número de lugares ocupados:', error);
        }
      );
  }

  fetchLibres() {
    this.http.get<any>('http://localhost:21500/admin/libres', { headers: this.getHeaders() })
      .subscribe(
        response => {
          if (response.success) {
            this.libres = response.espacios_disponibles;
          } else {
            this.handleError(response.message);
          }
        },
        error => {
          this.handleError('Error al obtener el número de lugares libres');
          console.error('Error al obtener el número de lugares libres:', error);
        }
      );
  }

  fetchGananciasDia(fecha: string) {
    this.http.get<any>(`http://localhost:21500/admin/ganancias_dia/${fecha}`, { headers: this.getHeaders() })
      .subscribe(
        response => {
          if (response.success) {
            this.gananciasDia = response.ganancias;
          } else {
            this.handleError(response.message);
          }
        },
        error => {
          this.handleError('Error al obtener las ganancias del día');
          console.error('Error al obtener las ganancias del día:', error);
        }
      );
  }

  fetchGananciasSemana(fechaInicio: string) {
    this.http.get<any>(`http://localhost:21500/admin/ganancias_semana/${fechaInicio}`, { headers: this.getHeaders() })
      .subscribe(
        response => {
          if (response.success) {
            this.gananciasSemana = response.semana;
          } else {
            this.handleError(response.message);
          }
        },
        error => {
          this.handleError('Error al obtener las ganancias de la semana');
          console.error('Error al obtener las ganancias de la semana:', error);
        }
      );
  }

  updateHolgura() {
    this.http.post<any>('http://localhost:21500/admin/holgura', { tiempo: this.tiempoHolgura }, { headers: this.getHeaders() })
      .subscribe(
        response => {
          if (response.success) {
            alert('El tiempo de holgura se actualizó correctamente.');
          } else {
            this.handleError(response.message);
          }
        },
        error => {
          this.handleError('Error al actualizar el tiempo de holgura');
          console.error('Error al actualizar el tiempo de holgura:', error);
        }
      );
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  handleError(error: string) {
    if (error === 'INVALID_TOKEN') {
      // Eliminar la cookie que contiene el token
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      this.router.navigate(['/login']);
    } else {
      alert(error);
    }
  }
}

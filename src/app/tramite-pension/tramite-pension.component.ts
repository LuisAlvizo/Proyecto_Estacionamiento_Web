import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tramite-pension',
  templateUrl: './tramite-pension.component.html',
  styleUrls: ['./tramite-pension.component.css']
})
export class TramitePensionComponent implements OnInit {
  username: string = '';
  password: string = '';
  costo: number = 0;
  codigoPension: number = 0;
  fechaCompra: string = '';
  fechaFin: string = '';
  errorMessage: string = ' ';
  exitoMessage: string = ' ';
  mostrarFormulario: boolean = true;
  mostrarBotonVerPension: boolean = false;


  nombreCompleto: string = '';
  email: string = '';
  telefono: string = '';
  curp: string = '';
  usernameNuevo: string = '';
  passwordNuevo: string = '';
  passwordConfirmacion: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  comprarPension() {
    const body = { username: this.username, password: this.password };
    this.http.post<any>('http://localhost:21500/pension/comprar', body)
      .subscribe(
        response => {
          if (response.success) {
            this.costo = response.tarifa;
            this.mostrarFormulario = false; 
            this.exitoMessage = 'La solicitud se ha realizado con éxito.';
          } else {
            this.errorMessage = response.message; 
          }
        },
        error => {
          console.error('Error:', error);
          this.errorMessage = 'Error en la solicitud. Inténtelo de nuevo más tarde.';
        }
      );
  }

  pagarPension() {
    const body = { username: this.username, password: this.password };
    this.http.post<any>('http://localhost:21500/pension/pagar', body)
      .subscribe(
        response => {
          if (response.success) {
            this.codigoPension = response.codigo_pension;
            this.fechaCompra = response.fecha_compra;
            this.fechaFin = response.fecha_fin;
            this.mostrarBotonVerPension = true; 
          } else {
            this.errorMessage = response.message; 
          }
        },
        error => {
          console.error('Error:', error);
          this.errorMessage = 'Error en la solicitud. Inténtelo de nuevo más tarde.';
        }
      );
  }
  

  crearUsuario() {
    if (this.passwordNuevo !== this.passwordConfirmacion) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const body = {
      nombre: this.nombreCompleto,
      email: this.email,
      telefono: this.telefono,
      curp: this.curp,
      username: this.usernameNuevo,
      password: this.passwordNuevo
    };

    this.http.post<any>('http://localhost:21500/usuario/registro', body).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Usuario registrado exitosamente');
          // Redirigir al sitio de compra de pensión
        } else {
          alert(response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('Error en el cliente:', error.error.message);
          alert('Error en el cliente: ' + error.error.message);
        } else {
          console.error('Error en el servidor:', error.message);
          alert('Error en el servidor: ' + error.message);
        }
      }
    });
  }

}

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
  costoPension: number | undefined;
  compraExitosa: boolean = false;
  codigoPension: string | undefined;
  fechaCompra: string | undefined;
  fechaFin: string | undefined;
  precio: number = 0;
  mostrarPrecio: boolean = false;

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
    const data = { username: this.username, password: this.password };
    this.http.post<any>('http://localhost:21500/pension/comprar', data)
      .subscribe(response => {
        if (response.success) {
          this.precio = response.costo;
          this.mostrarPrecio = true;
        } else {
          alert(response.message);
        }
      }, error => {
        console.error('Error al realizar la solicitud:', error);
        alert('Error al comunicarse con el servidor');
      });
  }

  pagarPension() {
    const data = { username: this.username, password: this.password };
    this.http.post<any>('http://localhost:21500/pension/pagar', data)
      .subscribe(response => {
        if (response.success) {
          this.codigoPension = response.codigo_pension;
          this.fechaCompra = response.fecha_compra;
          this.fechaFin = response.fecha_fin;
        } else {
          alert(response.message);
        }
      }, error => {
        console.error('Error al realizar la solicitud:', error);
        alert('Error al comunicarse con el servidor');
      });
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

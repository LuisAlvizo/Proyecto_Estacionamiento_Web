import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tramite-pension',
  templateUrl: './tramite-pension.component.html',
  styleUrls: ['./tramite-pension.component.css']
})
export class TramitePensionComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  pensionComprada: boolean = false;
  precioPension: number | undefined;
  codigoPension: string | undefined;
  fechaCompra: string | undefined;
  fechaFin: string | undefined;

  constructor(private http: HttpClient) {}

  comprarPension(): void {
    this.http.post<any>('http://localhost:21500/pension/comprar', { username: this.username, password: this.password })
      .subscribe(
        (response) => {
          if (response.success) {
            this.precioPension = response.tarifa;
            this.codigoPension = response.codigo_pension;
            this.fechaCompra = response.fecha_compra;
            this.fechaFin = response.fecha_fin;
            this.pensionComprada = true;
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = error.error.message;
        }
      );
  }

  pagarPension(): void {
    this.http.post<any>('http://localhost:21500/pension/pagar', { username: this.username, password: this.password })
      .subscribe(
        (response) => {
          if (response.success) {
            // Procesar la respuesta del pago si es necesario
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = error.error.message;
        }
      );
  }
}

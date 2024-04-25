import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  codigoTicket: string = '';
  totalPagar: number = 0;
  tipoPago: string = '';
  codigoDescuento: string = '';
  tipoDescuento: string = '';
  totalConDescuento: number = 0;
  codigoPension: string = '';
  nombreUsuario: string = '';
  alertMessage: string = '';

  constructor(private http: HttpClient) {}

  calcularPago() {
    if (!this.codigoTicket) {
      this.alertMessage = 'Se requiere un código de ticket';
      return;
    }

    this.http.get<any>(`http://localhost:21500/ticket/calcular_pago?codigo_ticket=${this.codigoTicket}`)
      .subscribe(
        response => {
          if (response.success) {
            this.totalPagar = response.pago;
            this.alertMessage = '';
          } else {
            this.alertMessage = 'Ticket no encontrado';
            this.totalPagar = 0;
          }
        },
        error => {
          this.alertMessage = 'Error al obtener el total a pagar';
          console.error('Error al obtener el total a pagar:', error);
        }
      );
  }

  validarDescuento() {
    if (!this.codigoDescuento) {
      this.alertMessage = 'Se requiere un código de descuento';
      return;
    }

    this.http.get<any>(`http://localhost:21500/descuento/validar_descuento?codigo_descuento=${this.codigoDescuento}`)
      .subscribe(
        response => {
          if (response.success) {
            this.tipoDescuento = response.tipo_descuento;
            if (this.tipoDescuento === 'porcentaje') {
              const descuento = response.descuento;
              this.totalConDescuento = this.totalPagar * (1 - descuento / 100);
            } else if (this.tipoDescuento === 'hora_gratis') {
              this.totalConDescuento = Math.max(this.totalPagar - 14, 0);
            }
            this.alertMessage = '';
          } else {
            this.alertMessage = 'Código de descuento no encontrado';
          }
        },
        error => {
          this.alertMessage = 'Error al validar el código de descuento';
          console.error('Error al validar el código de descuento:', error);
        }
      );
  }

  validarPension() {
    if (!this.codigoPension) {
      this.alertMessage = 'Se requiere un código de pensión';
      return;
    }

    this.http.post<any>('http://localhost:21500/pension/validar', { codigo_pension: this.codigoPension })
      .subscribe(
        response => {
          if (response.success) {
            this.nombreUsuario = response.nombre_usuario;
            this.alertMessage = '';
          } else {
            this.alertMessage = response.error;
          }
        },
        error => {
          this.alertMessage = 'Error al validar la pensión';
          console.error('Error al validar la pensión:', error);
        }
      );
  }

  pagar() {
    let requestBody: any = { codigo_ticket: this.codigoTicket, pago: { metodo_pago: this.tipoPago } };

    if (this.tipoPago === 'efectivo') {
      if (!this.codigoDescuento) {
        this.alertMessage = 'Se requiere un código de descuento';
        return;
      }
      requestBody.pago.codigo_descuento = this.codigoDescuento;
    } else if (this.tipoPago === 'tarjeta') {
      if (!this.codigoPension) {
        this.alertMessage = 'Se requiere un código de pensión';
        return;
      }
      requestBody.pago.codigo_pension = this.codigoPension;
    } else {
      this.alertMessage = 'Seleccione un tipo de pago';
      return;
    }

    this.http.post<any>('http://localhost:21500/ticket/pagar', requestBody)
      .subscribe(
        response => {
          if (response.success) {
            if (this.tipoPago === 'efectivo') {
              this.alertMessage = 'Pago realizado con éxito. Recibo generado.';
            } else {
              this.alertMessage = 'Pago realizado con éxito.';
            }
          } else {
            this.alertMessage = response.error;
          }
        },
        error => {
          this.alertMessage = 'Error al realizar el pago';
          console.error('Error al realizar el pago:', error);
        }
      );
  }
}

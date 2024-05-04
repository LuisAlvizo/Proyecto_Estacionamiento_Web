import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  codigoTicket: string = '';
  tipoPago: string = '';
  codigoDescuento: string = '';
  descuentoValidado: boolean = false;
  tipoDescuento: string = '';
  descuento: number = 0;
  nuevoTotal: number = 0;
  ticketExiste: boolean = false;
  pensionValidada: boolean = false;
  totalAPagar: number = 0;
  codigoPension: string = '';
  nombreUsuario: string = '';

  constructor(private http: HttpClient) { }

  calcularPago() {
    this.http.get<any>(`http://localhost:21500/ticket/calcular_pago?codigo_ticket=${this.codigoTicket}`)
      .subscribe(data => {
        if (data.success) {
          this.ticketExiste = true;
          this.totalAPagar = data.pago; // Asignar el total a pagar recibido del servidor
        } else {
          alert('El ticket no existe.');
        }
      });
  }

  validarDescuento() {
    this.http.get<any>(`http://localhost:21500/descuento/validar_descuento/${this.codigoDescuento}`)
      .subscribe(data => {
        if (data.success) {
          this.descuentoValidado = true;
          this.tipoDescuento = data.tipo;
          this.descuento = data.descuento;
          // Calcular nuevo total según el tipo de descuento
          if (data.tipo === 'PORCENTAJE') {
            this.nuevoTotal = this.totalAPagar - (this.totalAPagar * (data.descuento / 100));
          } else if (data.tipo === 'HORA_GRATIS' && this.totalAPagar > 14) {
            this.nuevoTotal = Math.max(this.totalAPagar - 14, 0);
          }
        } else {
          alert('El código de descuento no existe.');
        }
      });
  }

  validarPension() {
    this.http.post<any>('http://localhost:21500/pension/validar', { codigo_pension: this.codigoPension })
      .subscribe(data => {
        if (data.success) {
          this.pensionValidada = true;
          this.nombreUsuario = data.nombre_usuario;
        } else {
          alert(data.error);
        }
      });
  }

  realizarPago() {
    if (!this.ticketExiste) {
      alert('Primero escanee un ticket válido.');
      return;
    }

    if (this.tipoPago === 'PENSION' && !this.pensionValidada) {
      alert('Por favor, valide la pensión primero.');
      return;
    }

    const pago: any = { metodo_pago: this.tipoPago }; // Definir como any para evitar errores de tipo
    if (this.tipoPago === 'EFECTIVO') {
      pago.codigo_descuento = this.codigoDescuento;
    } else if (this.tipoPago === 'PENSION') {
      pago.codigo_pension = this.codigoPension;
    }

    this.http.post<any>('http://localhost:21500/ticket/pagar', { codigo_ticket: this.codigoTicket, pago })
      .subscribe(data => {
        if (data.success) {
          alert('Pago realizado con éxito.');
          // Habilitar botones para crear recibo y factura si el pago fue en efectivo
          if (this.tipoPago === 'EFECTIVO') {
            // Habilitar botones para crear recibo y factura
          }
        } else {
          alert('Error al realizar el pago.');
        }
      });
  }

  submitForm() {
    // Aquí puedes agregar más lógica si es necesario
  }
}

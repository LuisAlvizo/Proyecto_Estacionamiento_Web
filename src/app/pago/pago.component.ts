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
            this.nuevoTotal = this.nuevoTotal - (this.nuevoTotal * (data.descuento / 100));
          } else if (data.tipo === 'HORA_GRATIS' && this.nuevoTotal > 14) {
            this.nuevoTotal -= 14;
          }
        } else {
          alert('El código de descuento no existe.');
        }
      });
  }

  realizarPago() {
    const pago: any = { metodo_pago: this.tipoPago }; // Definir como any para evitar errores de tipo
    if (this.tipoPago === 'EFECTIVO') {
      pago.codigo_descuento = this.codigoDescuento;
    } else if (this.tipoPago === 'PENSION') {
      // Aquí puedes realizar la validación de la pensión si es necesaria
      this.pensionValidada = true; // Simulación de validación exitosa
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

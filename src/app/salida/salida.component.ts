import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent {
  codigoTicket: string = '';

  constructor(private http: HttpClient) {}

  salirEstacionamiento() {
    if (!this.codigoTicket) {
      console.error('Se requiere un código de ticket');
      return;
    }

    this.http.get<any>(`http://localhost:21500/ticket/salir/${this.codigoTicket}`)
      .subscribe(
        response => {
          if (response.success) {
            alert('Salida del estacionamiento');
          } else {
            console.error('Error al salir del estacionamiento:', response.message);
            alert('Error al salir del estacionamiento: ' + response.message);
          }
        },
        error => {
          console.error('Error al salir del estacionamiento:', error);
          alert('Error al salir del estacionamiento: ' + error.message);
        }
      );
  }
}

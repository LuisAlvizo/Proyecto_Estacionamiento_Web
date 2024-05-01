import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent {
  codigoTicket: string = '';
  alertMessage: string = '';
  alertClass: string = '';

  constructor(private http: HttpClient) {}

  salirEstacionamiento() {
    if (!this.codigoTicket) {
      this.showAlert('Se requiere un código de ticket', 'error-alert');
      return;
    }

    this.http.get<any>(`http://localhost:21500/ticket/salir/${this.codigoTicket}`)
      .subscribe(
        response => {
          if (response.success) {
            this.showAlert('Salida del estacionamiento exitosa!!!', 'success-alert');
          } else {
            const errorMessage = 'Error al salir del estacionamiento: ';
            this.showAlert(errorMessage, 'error-alert');
          }
        },
        error => {
          const errorMessage = 'Error al salir del estacionamiento: ';
          this.showAlert(errorMessage, 'error-alert');
        }
      );
  }

  private showAlert(message: string, alertClass: string) {
    this.alertMessage = message;
    this.alertClass = alertClass;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertClass = '';
    }, 5000); 
  }
}

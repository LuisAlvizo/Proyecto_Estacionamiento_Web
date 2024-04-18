import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent {
  constructor(private http: HttpClient) { }

  crearTicket(): void {
    this.http.get<any>('http://localhost:21500/ticket/crear-ticket').subscribe(
      (response) => {
        console.log('Ticket creado con éxito:', response);
        // Aquí puedes procesar la respuesta según tus necesidades
      },
      (error) => {
        console.error('Error al crear el ticket:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
}

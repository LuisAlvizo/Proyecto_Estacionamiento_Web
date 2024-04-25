import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TicketModalComponent } from '../ticket-modal/ticket-modal.component';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent {
  constructor(private http: HttpClient, public dialog: MatDialog) { }

  crearTicket(): void {
    this.http.get<any>('http://localhost:21500/ticket/crear-ticket').subscribe(
      (response) => {
        const dialogRef = this.dialog.open(TicketModalComponent, {
          data: { ticket: response, success: response.success }
        });
      },
      (error) => {
        const dialogRef = this.dialog.open(TicketModalComponent, {
          data: { ticket: null, success: false }
        });
      }
    );
  }
}

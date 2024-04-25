import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css']
})
export class TicketModalComponent {
  ticket: any;
  success: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.ticket = data.ticket;
    this.success = data.success;
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntradaComponent } from './entrada/entrada.component';
import { PagoComponent } from './pago/pago.component';
import { TramitePensionComponent } from './tramite-pension/tramite-pension.component';
import { SalidaComponent } from './salida/salida.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminpanelComponent } from './admin-panel/adminpanel.component';


@NgModule({
  declarations: [
    AppComponent,
    EntradaComponent,
    PagoComponent,
    TramitePensionComponent,
    SalidaComponent,
    SidebarComponent,
    TicketModalComponent,
    LoginFormComponent,
    AdminpanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

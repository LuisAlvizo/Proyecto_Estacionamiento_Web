import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntradaComponent } from './entrada/entrada.component';
import { PagoComponent } from './pago/pago.component';
import { TramitePensionComponent } from './tramite-pension/tramite-pension.component';
import { SalidaComponent } from './salida/salida.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    EntradaComponent,
    PagoComponent,
    TramitePensionComponent,
    SalidaComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

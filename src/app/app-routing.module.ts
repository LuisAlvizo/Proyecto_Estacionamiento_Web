import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradaComponent } from './entrada/entrada.component';
import { PagoComponent } from './pago/pago.component';
import { SalidaComponent } from './salida/salida.component';
import { TramitePensionComponent } from './tramite-pension/tramite-pension.component';

const routes: Routes = [
  { path: 'entrada', component: EntradaComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'salida', component: SalidaComponent },
  { path: 'tramite', component: TramitePensionComponent },
  { path: '', redirectTo: '/entrada', pathMatch: 'full' }, // Redirige al componente de entrada por defecto
  { path: '**', redirectTo: '/entrada' } // Redirige cualquier ruta no encontrada al componente de entrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

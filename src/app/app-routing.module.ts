import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradaComponent } from './entrada/entrada.component';
import { PagoComponent } from './pago/pago.component';
import { SalidaComponent } from './salida/salida.component';
import { TramitePensionComponent } from './tramite-pension/tramite-pension.component';
import { AdminPanelComponent } from './admin-panel/adminpanel.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: 'entrada', component: EntradaComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'salida', component: SalidaComponent },
  { path: 'tramite', component: TramitePensionComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '', redirectTo: '/entrada', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/entrada' } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

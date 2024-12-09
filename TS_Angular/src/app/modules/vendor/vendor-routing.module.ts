import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { PostTicketComponent } from './components/post-ticket/post-ticket.component';
import { UpdateTicketComponent } from './components/update-ticket/update-ticket.component';

const routes: Routes = [
  {path:"dashboard", component:VendorDashboardComponent},
  {path:"ticket",component:PostTicketComponent},
  {path:"ticket/:id",component:UpdateTicketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }

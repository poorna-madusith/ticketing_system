import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { PostTicketComponent } from './components/post-ticket/post-ticket.component';

const routes: Routes = [
  {path:"dashboard", component:VendorDashboardComponent},
  {path:"ticket",component:PostTicketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }

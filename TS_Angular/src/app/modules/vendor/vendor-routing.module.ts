import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';

const routes: Routes = [
  {path:"dashboard", component:VendorDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }

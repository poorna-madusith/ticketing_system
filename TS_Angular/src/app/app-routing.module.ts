import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [
  {path:"register", component: SignupComponent},
  {path:"login", component: LoginComponent},
  {path:"vendor",loadChildren:() => import("./modules/vendor/vendor.module").then( m =>m.VendorModule)},
  {path:"customer",loadChildren: () => import("./modules/customer/customer.module").then( m =>m.CustomerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

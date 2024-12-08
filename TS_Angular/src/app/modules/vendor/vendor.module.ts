import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { PostTicketComponent } from './components/post-ticket/post-ticket.component';
import { NgZorroImportsModule } from '../../NgZorroImportsModule';


@NgModule({
  declarations: [
    VendorDashboardComponent,
    PostTicketComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    NgZorroImportsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VendorModule { }

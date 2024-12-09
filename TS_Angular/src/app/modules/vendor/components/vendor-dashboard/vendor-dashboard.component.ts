import { Component } from '@angular/core';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.scss'
})
export class VendorDashboardComponent {

  tickets: any = [];

  constructor(
    private vendorService:VendorService,){}

    ngOnInit(){
      this.getAllTickets();

    }

    getAllTickets(){
      this.vendorService.getAllTickets().subscribe((res)=>{
        console.log(res);
        res.forEach((element: any) => {
          this.tickets.push(element);
        });
      })
    }

}

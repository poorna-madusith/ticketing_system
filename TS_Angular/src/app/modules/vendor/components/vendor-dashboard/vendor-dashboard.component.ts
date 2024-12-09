import { Component } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.scss'
})
export class VendorDashboardComponent {

  tickets: any = [];

  constructor(
    private vendorService:VendorService,
    private message:NzMessageService
  ){}

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

    deleteTicket(id:number){
      console.log(id);
      this.vendorService.deleteTicket(id).subscribe((res)=>{
        this.getAllTickets();
        this.message.success("Ticket deleted successfully",{nzDuration:5000});

        setTimeout(() => {
          location.reload();
        }, 500);

      })
    }

}

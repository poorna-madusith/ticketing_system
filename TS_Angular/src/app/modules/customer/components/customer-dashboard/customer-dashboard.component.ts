import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {

  tickets: any = []

  constructor(private service:CustomerService){}

  ngOnInit(){
    this.getAllTickets();

  }

  getAllTickets(){
    this.service.getAllTickets().subscribe((res)=>{
      console.log(res);
      res.forEach((element: any) => {
        this.tickets.push(element);
      });
    })
  }

}

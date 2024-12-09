import { Component } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss']
})
export class UpdateTicketComponent {

  ticketId!: number;

  constructor(
    private vendorService: VendorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ticketId = Number(this.activatedRoute.snapshot.params["id"]);
    this.getTicketById();
  }

  getTicketById() {
    this.vendorService.getTicketById(this.ticketId).subscribe((res) => {
      console.log(res);
    });
  }
}

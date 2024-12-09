import { Component } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss']
})
export class UpdateTicketComponent {
  

  isSpinning = false;
  ticketId!: number;
  updateForm!: FormGroup;
  listOfOptions: Array<{ label: string; value: string }> = [];
  listOfTotaltickets = ["25", "50", "100", "200", "300", "400", "500"];

  
  constructor(
    private vendorService: VendorService,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder
  ) {}

  ngOnInit() {
    this.ticketId = Number(this.activatedRoute.snapshot.params["id"]);
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      date: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      totaltickets: [null, Validators.required],
      description: [null, Validators.required]

    })
    this.getTicketById();
  }

  getTicketById() {
    this.isSpinning = true;
    this.vendorService.getTicketById(this.ticketId).subscribe((res) => {
      //console.log(res);
      this.isSpinning = false;
      const ticketDto = res;  
      console.log(ticketDto);
      this.updateForm.patchValue(ticketDto);
    });
  }
}

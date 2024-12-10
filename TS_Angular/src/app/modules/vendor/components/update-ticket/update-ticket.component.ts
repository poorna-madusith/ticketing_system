import { Component } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private fb:FormBuilder,
    private message:NzMessageService,
    private router:Router
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
      this.isSpinning = false;
      const ticketDto = res;
      console.log(ticketDto);
      // Format the date if needed before patching
      if (ticketDto.date) {
        ticketDto.date = new Date(ticketDto.date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
      }
      this.updateForm.patchValue(ticketDto);
    });
  }
  
  updateTicket() {
    if (this.updateForm.invalid) {
      this.message.error('Please fill all required fields.', { nzDuration: 3000 });
      return;
    }
  
    this.isSpinning = true;
  
    const formData: FormData = new FormData();
    formData.append('name', this.updateForm.get('name')?.value ?? '');
    formData.append('date', this.updateForm.get('date')?.value ?? ''); // Ensure date format matches backend expectations
    formData.append('price', this.updateForm.get('price')?.value ?? '');
    formData.append('totaltickets', this.updateForm.get('totaltickets')?.value ?? '');
    formData.append('description', this.updateForm.get('description')?.value ?? '');
  
    this.vendorService.updateTicket(this.ticketId, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success('Ticket updated successfully!', { nzDuration: 5000 });
        this.router.navigateByUrl('/vendor/dashboard');
      },
      (error) => {
        this.isSpinning = false;
        this.message.error('Error while updating ticket.', { nzDuration: 5000 });
        console.error('Error:', error);
      }
    );
  }
  

}

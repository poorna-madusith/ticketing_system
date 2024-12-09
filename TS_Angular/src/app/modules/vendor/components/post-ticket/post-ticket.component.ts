import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-ticket',
  templateUrl: './post-ticket.component.html',
  styleUrls: ['./post-ticket.component.scss']
})
export class PostTicketComponent implements OnInit {
  postTicketForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null | undefined;
  listOfOptions: Array<{ label: string; value: string }> = [];
  listOfTotaltickets = ["25", "50", "100", "200", "300", "400", "500"];

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postTicketForm = this.fb.group({
      name: [null, Validators.required],
      date: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      totaltickets: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  postTicket(): void {
    if (this.postTicketForm.invalid) {
      this.message.error('Please fill all required fields.', { nzDuration: 3000 });
      return;
    }

    this.isSpinning = true;

    const formData = new FormData();
    formData.append('name', this.postTicketForm.get('name')?.value ?? '');
    formData.append('date', this.postTicketForm.get('date')?.value ?? '');
    formData.append('price', this.postTicketForm.get('price')?.value ?? '');
    formData.append('totaltickets', this.postTicketForm.get('totaltickets')?.value ?? '');
    formData.append('description', this.postTicketForm.get('description')?.value ?? '');

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.vendorService.postTicket(formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success('Ticket posted successfully!', { nzDuration: 5000 });
        this.router.navigateByUrl('/vendor/dashboard');
      },
      (error) => {
        this.isSpinning = false;
        this.message.error('Error while posting ticket.', { nzDuration: 5000 });
        console.error('Error:', error);
      }
    );
  }
}

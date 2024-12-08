import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.postTicketForm = this.fb.group({
      name: [null, Validators.required],
      date: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      totaltickets: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  postTicket(): void {
    if (this.postTicketForm.invalid) {
      console.error("Form is invalid. Please fill all required fields.");
      return;
    }

    console.log(this.postTicketForm.value);

    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    } else {
      console.error("No file selected to upload.");
    }

    formData.append('name', this.postTicketForm.get('name')?.value ?? '');
    formData.append('date', this.postTicketForm.get('date')?.value ?? '');
    formData.append('price', this.postTicketForm.get('price')?.value ?? '');
    formData.append('totaltickets', this.postTicketForm.get('totaltickets')?.value ?? '');
    formData.append('description', this.postTicketForm.get('description')?.value ?? '');

    console.log("Form Data Submitted: ", formData);
    // You can add your API call logic here to send `formData` to the server
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
    this.previewImage();
  }

  previewImage(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      console.error("No file selected for preview.");
      this.imagePreview = null;
    }
  }
}
 
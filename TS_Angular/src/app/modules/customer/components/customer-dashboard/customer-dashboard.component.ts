import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {
  tickets: any = [];
  quantities: number[] = [1, 2, 3, 4, 5]; // Quantities for dropdown

  constructor(private service: CustomerService) {}

  ngOnInit() {
    this.getAllTickets();
  }

  getAllTickets() {
    this.service.getAllTickets().subscribe((res) => {
      console.log(res);
      res.forEach((element: any) => {
        element.selectedQuantity = 1; // Default quantity for each ticket
        this.tickets.push(element);
      });
    });
  }

  buyTickets(ticket: any) {
    if (ticket.selectedQuantity > ticket.totaltickets) {
      alert('Not enough tickets available!');
      return;
    }
  
    this.service.buyTickets(ticket.id, ticket.selectedQuantity).subscribe(
      (response: any) => {
        console.log('Response:', response);
        // Check if the response is an object with the 'message' property
        if (response && response.success) {
          // Update local ticket count and show success message
          ticket.totaltickets -= ticket.selectedQuantity;
          alert(response.message);
        } else {
          // Handle invalid response structure
          console.error('Unexpected response structure:', response);
          alert('Failed to buy tickets. Invalid server response.');
        }
      },
      (error) => {
        console.error('Error buying tickets:', error);
        // Improved error handling for JSON errors
        if (error.error && typeof error.error === 'object') {
          alert(error.error.error || 'An error occurred.');
        } else if (error.status === 200) {
          // Handle unexpected response when status is OK but body is not valid JSON
          alert('Unexpected response from the server. Please try again.');
        } else if (error.status === 0) {
          alert('Cannot connect to the server. Check your network.');
        } else {
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    );
  }
  
  
  
  
}

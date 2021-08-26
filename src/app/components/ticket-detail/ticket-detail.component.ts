import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
})
export class TicketDetailComponent implements OnInit {
  ticket!: Ticket;
  customer!: Customer;
  ticketId!: number;
  constructor(
    private _ticketService: TicketService,
    private _customerService: CustomerService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.ticketId = Number(params.get('id'));
      this._ticketService.getOne(this.ticketId).subscribe((data) => {
        console.log(data);
        this.ticket = data;
      });
    });
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.ticketId = Number(params.get('id'));
      this._customerService
        .getCustomerByTicketId(this.ticketId)
        .subscribe((data) => {
          console.log(data);
          this.customer = data;
        });
    });
  }
  return(): void {
    this._ticketService.return(this.ticket.id).subscribe((data) => {
      console.log('Response: ' + data);
      this._router.navigateByUrl('/list-ticket');
    });
  }
  update(): void {
    console.log(this.ticket.id);
    console.log(this.ticket.startDateTime);
    console.log(this.ticket.endDateTime);
    console.log(this.ticket.remark);
    this._ticketService.update(this.ticket).subscribe((data) => {
      console.log('Response: ' + data);
      this._router.navigateByUrl('/list-ticket');
    });
  }
  onChange() {

  }
}

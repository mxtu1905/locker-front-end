import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.css']
})
export class TicketHistoryComponent implements OnInit {

  tickets: Ticket[] = [];
  id!: number;
  constructor(
    private _customerService: CustomerService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      this._customerService.getTicketsByCustomerId(this.id).subscribe(
        data => {
          console.log(data);
          this.tickets = data;
        }
      )
    })  
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';


@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {
  inUseTickets: Ticket[] = []
  returnedTickets: Ticket[] = []
  filterTickets: Ticket[] = []
  selectMode: string[] = ['All' , 'Returned', 'In use']
  selectedMode: string = ''
  filter = {startDate: '', toDate: ''}

  constructor(
    private _ticketService: TicketService,
    private _router: Router
  ) { }


  ngOnInit(): void {
    this._ticketService.getInUse().subscribe((data) => {
      this.inUseTickets = data;
      console.log(data);
    })
    this._ticketService.getReturned().subscribe((data) => {
      this.returnedTickets = data;
      console.log(data);
    })
  }
  search() {
    console.log(this.selectedMode);
    if (this.selectedMode == "Returned") {
      this._ticketService.getReturned().subscribe((data) => {
        this.returnedTickets = data;
        console.log(data);
      })
      this.inUseTickets = [];
    }
    else if (this.selectedMode == "In use") {
      this._ticketService.getInUse().subscribe((data) => {
        this.inUseTickets = data;
        console.log(data);
      })
      this.returnedTickets = []
    }
    else {
      this._ticketService.getInUse().subscribe((data) => {
        this.inUseTickets = data;
        console.log(data);
      })
      this._ticketService.getReturned().subscribe((data) => {
        this.returnedTickets = data;
        console.log(data);
      })
    }
  }

  getByFilter() {
    console.log(this.filter.startDate);
    console.log(this.filter.toDate);
    this._ticketService.getByFilter(this.filter.startDate, this.filter.toDate).subscribe((data) => {
      this.filterTickets = data;
      this.returnedTickets = [];
      this.inUseTickets = [];
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
})
export class ListCustomerComponent implements OnInit {
  customers: Customer[] = [];
  filters = {
    id: 1,
    name: '',
    phone: '',
  };
  constructor(
    private _customerService: CustomerService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._customerService.getCustomers().subscribe((data) => {
      this.customers = data;
      console.log(data);
    });
  }
  getByFilter(): void {
    if (this.filters.id == null || this.filters.name == null || this.filters.phone == null
      || this.filters.name.length == 0 || this.filters.phone.length == 0) {
      this._customerService.getCustomers().subscribe((data) => {
        this.customers = data;
        console.log(data);
      });
    }
    else {
      this._customerService
      .getByFilter(this.filters.id, this.filters.name, this.filters.phone)
      .subscribe((data) => {
        this.customers = data;
        console.log(data);
      });
    }
  }
}

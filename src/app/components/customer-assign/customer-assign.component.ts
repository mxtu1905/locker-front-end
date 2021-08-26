import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Locker } from 'src/app/models/locker';
import { CustomerService } from 'src/app/services/customer.service';
import { LockerService } from 'src/app/services/locker.service';
@Component({
  selector: 'app-customer-assign',
  templateUrl: './customer-assign.component.html',
  styleUrls: ['./customer-assign.component.css'],
})
export class CustomerAssignComponent implements OnInit {
  customerId!: number;
  customer!: Customer;
  lockers!: Locker[];
  selectedLockers: string[] = [];
  remark: string = '';
  constructor(
    private _lockerService: LockerService,
    private _customerService: CustomerService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.customerId = Number(params.get('id'));
      this._customerService.getOne(this.customerId).subscribe((data) => {
        console.log(data);
        this.customer = data;
      });
    });

    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this._lockerService.getLockers().subscribe((data) => {
        console.log(data);
        this.lockers = data;
      });
    });
  }
  addOrRemove(locker:Locker) {
    console.log('add')
    if (this.selectedLockers.indexOf(locker.lockerCode) == -1) {
      this.selectedLockers.push(locker.lockerCode)
    }
    else {
      this.selectedLockers.forEach((item, index) => {
        if (item == locker.lockerCode) this.selectedLockers.splice(index, 1);
      })
    }
    console.log(this.selectedLockers);
  }
  submit() {
    console.log(this.remark)
    this._customerService.assign(this.customerId, this.selectedLockers, this.remark).subscribe((data) => {
      console.log('Response: ' + data.fullName);
      this._router.navigateByUrl("/list-customer");
    })
  }
}

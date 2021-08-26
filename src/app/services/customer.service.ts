import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from '../models/customer';
import { Ticket } from '../models/ticket';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'

})

export class CustomerService {
    private url: string = "http://localhost:8080/api/customer";

    constructor(private _httpClient: HttpClient) { }

    getOne(id: number): Observable<Customer> {
        return this._httpClient.get<Customer>(this.url + "/get/" + id).pipe(
            map(response => response)
        );
    }

    assign(id: number, lockerCodes: string[], remark: string): Observable<Customer>{
        console.log('Service call')
        console.log(this.url + '/assign/' + id + '/' + lockerCodes + '/' + remark);
        return this._httpClient.post<Customer>(this.url + '/assign/' + id + '/' + lockerCodes + '/' + remark, null)
    }

    getCustomers(): Observable<Customer[]> {
        return this._httpClient.get<Customer[]>(this.url + "/all").pipe(
            map(response => response)
        );
    }
    getCustomerByTicketId(ticketId: number): Observable<Customer> {
        return this._httpClient.get<Customer>(this.url + "/get-by-ticket/" + ticketId).pipe(
            map(response => response)
        );
    }
    getTicketsByCustomerId(id: number): Observable<Ticket[]> {
        console.log('Service customer id: ' + id);
        return this._httpClient.get<Ticket[]>(this.url + '/ticket-history/' + id)
    }
    getByFilter(id: number, name: string, phone: string): Observable<Customer[]> {
        console.log(id + '-' + name + '-' + phone);
        return this._httpClient.get<Customer[]>(this.url + '/search/' + id + '/' + name + '/' + phone);
    }
}
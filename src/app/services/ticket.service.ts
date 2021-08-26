import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from '../models/customer';
import { Ticket } from '../models/ticket';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'

})

export class TicketService {
    private url: string = "http://localhost:8080/api/ticket";

    constructor(private _httpClient: HttpClient) { }

    getTickets(): Observable<Ticket[]> {
        return this._httpClient.get<Ticket[]>(this.url + "/all").pipe(
            map(response => response)
        );
    }

    getOne(id: number): Observable<Ticket> {
        return this._httpClient.get<Ticket>(this.url + "/get/" + id).pipe(
            map(response => response)
        );
    }
    getInUse(): Observable<Ticket[]> {
        return this._httpClient.get<Ticket[]>(this.url + "/get-in-use").pipe(
            map(response => response)
        );
    }
    getReturned(): Observable<Ticket[]> {
        return this._httpClient.get<Ticket[]>(this.url + "/get-returned").pipe(
            map(response => response)
        );
    }

    return(id: number): Observable<Object> {
        return this._httpClient.post(this.url + "/return/" + id, null);
    }
    update(ticket: Ticket): Observable<Object> {
        console.log(ticket.id);
        console.log(ticket.startDateTime);
        console.log(ticket.endDateTime);
        console.log(ticket.remark);
        return this._httpClient.post(this.url + "/update/" + ticket.id, ticket);
    }


    getByFilter(startDate: string, toDate: string): Observable<Ticket[]> {
        console.log('Service: ' + this.url + "/get-by-filter/" + startDate + "/" + toDate);
        return this._httpClient.get<Ticket[]>(this.url + "/get-by-filter/" + startDate + "/" + toDate).pipe(
            map(response => response)
        );
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Ticket } from '../models/ticket';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Locker } from '../models/locker';

@Injectable({
  providedIn: 'root',
})
export class LockerService {
  private url: string = 'http://localhost:8080/api/locker';
  constructor(private _httpClient: HttpClient) {}

  getLockers(): Observable<Locker[]> {
    return this._httpClient
      .get<Locker[]>(this.url + '/all')
      .pipe(map((response) => response));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from './base_url';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public placeOrder(order:any):Observable<any>{
    return this.http.post(BASE_URL + "/placeOrder", order);
  }
}

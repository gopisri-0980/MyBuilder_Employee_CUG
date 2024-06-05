
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ProductService {

 
  
  private subject = new Subject<any>();
  private subject1 = new Subject<any>();
  private subject2 = new Subject<any>();
  private subject3 = new Subject<any>();
  private subject4 = new Subject<any>();

  sendNumber(number:number){
    this.subject.next({text:number});
  }

  getNumber():Observable<any>{
    return this.subject.asObservable();
  }

  ticket_sendNumber(number1:number){
    this.subject1.next({text:number1});
  }

  ticket_getNumber():Observable<any>{
    return this.subject1.asObservable();
  }


  complaint_sendNumber(number2:number){
    this.subject2.next({text:number2});
  }

  complaint_getNumber():Observable<any>{
    return this.subject2.asObservable();
  }

  appointment_sendNumber(number3:number){
    this.subject3.next({text:number3});
  }

  appointment_getNumber():Observable<any>{
    return this.subject3.asObservable();
  }


  project_sendNumber(number3:number){
    this.subject4.next({text:number3});
  }

  project_getNumber():Observable<any>{
    return this.subject4.asObservable();
  }


  

}
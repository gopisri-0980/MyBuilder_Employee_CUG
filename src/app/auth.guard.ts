import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}

  canActivate(): boolean{
    if(sessionStorage.getItem('login_sessionkey')){
      console.log("authguard");
      return true;
    }else{
      console.log("else authguard");
      this.router.navigate(['/login'])
      return false;
    }
  }

}

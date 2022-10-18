import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean =
    localStorage.getItem('mockLoggedIn') === null ? false : true;
  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    this.isLoggedIn
  );
  public errorMessage: BehaviorSubject<string> = new BehaviorSubject('');
  private mockUsers: any[];

  constructor() {
    this.mockUsers = [
      {
        name: 'István',
        password: 'Jonapot89**'
      },
      {
        name: 'Sándor',
        password: 'Jonapot89**'
      },
      {
        name: 'József',
        password: 'Jonapot89**'
      }
    ];
  }

  public isAuthenticated() {
    return this.isLoggedIn;
  }

  public loggedInUser(){
    return localStorage.getItem('mockLoggedIn') || '';
  }

  public logIn(credentials: { name: string; password: string }) {
    let user = this.mockUsers.find(o => o.name === credentials.name);
    if(user && user.password === credentials.password){
      localStorage.setItem('mockLoggedIn', credentials.name);
      this.isLoggedIn = true;
      this.isLoggedInSubject.next(true);
      this.errorMessage.next('');
    }else{
      this.errorMessage.next('Wrong credentials!')
    }
  }

  public logOut() {
    localStorage.removeItem('mockLoggedIn');
    this.isLoggedIn = false;
    this.isLoggedInSubject.next(false);
  }
}

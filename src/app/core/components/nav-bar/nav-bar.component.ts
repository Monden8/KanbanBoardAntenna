import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'kanban-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public loggedIn: boolean = false;

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {
    this.authService.isLoggedInSubject.subscribe(loggedValue =>{ this.loggedIn = loggedValue})
  }

  public logIn(){
    this.router.navigate(['/login']);
  }

  public logOut(){
    this.authService.logOut()
  }

  ngOnDestroy(): void {
    this.authService.isLoggedInSubject.unsubscribe()
  }
}

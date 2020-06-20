import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user:User
  constructor(private auth:AngularFireAuth) { 
    this.auth.user.subscribe((user)=>{
      this.user=user
    })
  }

  ngOnInit(): void {
   
  }
  logout() {
    this.auth.signOut();
  }
}

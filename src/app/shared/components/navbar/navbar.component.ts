import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @Input() user!:User;

  public auth:boolean  = this.authService.isAuth;


  ngOnInit(): void {
    //this.auth = this.user?.email ? true : false;
    console.log(this.auth)
  }
  

  logout(){
    this.auth=false; 
  }
  login(){
    this.auth=true; 
  }




}

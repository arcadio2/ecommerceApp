import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges{

  constructor(private authService: AuthService) { }

  @Input() user!:User;

  public auth!:boolean;


  ngOnInit(): void {
    //this.auth = this.user?.email ? true : false;
    this.authService._isAuth.subscribe(v =>{
      this.auth=v;
      this.user = this.authService.usuario;
    })
    
  }
  ngOnChanges() {
    console.log("xd")
  }
  

  logout(){
    this.auth=false; 
  }
  login(){
    this.auth=true; 
  }




}

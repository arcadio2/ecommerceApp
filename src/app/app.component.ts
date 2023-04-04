import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerceApp';
  user!:User ;

  constructor(private auth:AuthService){
    this.user = this.auth.usuario
  }
  
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  token!:string;
  usuario!:User;
  constructor(private route: ActivatedRoute,
    private toastService: ToastrService,
    private router:Router,
    private auth:AuthService,
    private userService:UsuarioService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params=>{
      this.token = params.get('uiid')!;
      this.userService.activarUsuario(this.token).subscribe(resp=>{
        this.toastService.success("Usuario activado");
        const user_x = this.auth.usuario; 
        user_x.active=true; 
        this.auth.usuario=user_x; 
        this.router.navigateByUrl('/home'); 
      },err=>{
        
      });
      //this.loadData(); 
    });
  }

  loadData(){
    this.userService.getUserByUsername(this.auth.usuario.username).pipe(
      tap((resp:any)=>{
        this.usuario=resp.usuario as User; 

        if(this.usuario.token==this.token){
          
        }
      })
    ).subscribe(); 
  }

}

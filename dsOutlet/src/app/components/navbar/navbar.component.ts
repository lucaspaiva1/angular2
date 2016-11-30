import { Component, Input, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { UserService } from '../../services/user.service';
import {MaterializeAction} from 'angular2-materialize';
import { EsqueciSenhaService } from '../../services/esqueci-senha.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() isAdmin: boolean;
  @Input() isLogado: boolean;
  modalActions = new EventEmitter<string|MaterializeAction>();
  private login: string;
  private senha: string;
  private url: string;
  private email: string;

  constructor(private router: Router, private userService: UserService, private esqueciSenha: EsqueciSenhaService) {
    this.url = this.router.url;
  }

  private fazerLogin(): void {
    if(!(this.login == null || this.senha == null)){
      this.userService.login(this.login, this.senha)
      .then(sucess => {
        if(sucess == true){
            this.modalActions.emit({action:"modal",params:['close']});
            this.router.navigate(['/gerenciador']);
        }else{
          toast('Login ou senha incorretos', 4000, 'rounded');
        }
      });
    }else{
      toast('Login ou senha incorretos', 4000, 'rounded');
    }
  }

  private deslogar(): void {
    this.userService.logout();
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.router.navigate(['/home']);
  }

  private enviar(): void {
    this.esqueciSenha.enviaEmail(this.email).then(res=>{
      if(res){
        toast('Email Enviado', 4000, 'rounded');
      }else{
        toast('Email não Cadastrado', 4000, 'rounded');
      }
    });

  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css']
})
export class MinhaContaComponent {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private usuario: User = new User();
  private confirmaSenha: string;

  private id: number;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.id = stats[2];
    console.log(this.id);
  }

  ngOnInit() {
    if (!this.isLogado) {
      this.router.navigate(['/home']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    } else {
      this.getUser(this.id);
    }
  }

  change(event) {
    console.log(event);
    this.usuario.telefone = event;
  }

  private getUser(id: number): void {
    this.userService.getUser(id).then(res => {
      if (res == null) {
        this.router.navigate(['/gerenciador']);
      } else {
        this.usuario = res;
        this.confirmaSenha = this.usuario.senha;
      }

    });
  }

  editar() {
    if (this.confirmaSenha != this.usuario.senha) {
      toast('Senhas incorretas!', 4000, 'rounded');

    } else {
      if (this.usuario.nome == null || this.usuario.nome == "" || this.usuario.login == null || this.usuario.senha == null || this.usuario.senha == "" || this.usuario.acesso == "" || this.usuario.email == null) {
        toast('Falta dados!', 4000, 'rounded');
      } else {
        this.userService.editUser(this.usuario).then(res => {
          if (res) {
            toast('Salvo!', 4000, 'rounded');
            this.router.navigate(['/gerenciador']);
          } else {
            toast('Não foi possível salvar!', 4000, 'rounded');
          }

        });
      }
    }
  }

  excluir() {
    this.userService.deleteUser(this.usuario.id).then(res => {
      if (res) {
        toast('Excluído!', 4000, 'rounded');
        this.router.navigate(['/gerenciador']);
      } else {
        toast('Não foi possível excluir', 4000, 'rounded');
      }
    });
  }

}

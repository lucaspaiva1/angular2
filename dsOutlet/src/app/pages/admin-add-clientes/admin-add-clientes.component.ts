import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { toast } from 'angular2-materialize';

import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../model/cliente';
import { Endereco } from '../../model/endereco';

@Component({
  selector: 'app-admin-add-clientes',
  templateUrl: './admin-add-clientes.component.html',
  styleUrls: ['./admin-add-clientes.component.css']
})
export class AdminAddClientesComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private cliente: Cliente = new Cliente();
  private endereco: Endereco = new Endereco();

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private clientesService: ClientesService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if (!this.isLogado) {
      this.router.navigate(['/home']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    } else {
    }
  }

  adicionar() {
    if (this.cliente.nome != null && this.cliente.cpf != null && this.cliente.telefone != null) {
      this.cliente.endereco = this.endereco;
      //this.clientesService.addCliente(this.cliente);
      console.log(this.cliente);
      this.cliente = new Cliente();
      toast('Salvo!', 4000, 'rounded');
    } else {
      toast('Faltam Informações!', 4000, 'rounded');
    }
  }

}

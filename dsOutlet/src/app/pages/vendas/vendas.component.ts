import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { toast } from 'angular2-materialize';
import { UserService } from '../../services/user.service';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private vendaFinalizada: boolean;
  private produtos: Produto[] = [];
  private itens: Produto[]=[]; 
  valorTotal: number = 0;
  private search: string;

  constructor(private router: Router, private userService: UserService, private produtosService: ProdutosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.produtosService.getProdutos().then(res => {
      this.produtos = res;
    });
    this.search="";
  }

  ngOnInit() {
    /*se os dados indicarem que usuario não está logado, ele será redirecionado para a pagina principal*/
    if (!this.isLogado) {
      this.router.navigate(['/home']);
    }
  }

  private adicionarItem() {
    toast('Produto adicionado!', 2000, 'rounded');
    for (let item of this.produtos) {
      console.log(item); // 1, "string", false
      this.valorTotal = this.valorTotal + item.precoSaidaPadrao;
    }
  }

  private finalizar() {
    this.vendaFinalizada = true;
  }

  limpar(){
    this.search="";
  }

}

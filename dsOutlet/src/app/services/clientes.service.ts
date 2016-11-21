import { Injectable } from '@angular/core';

import { Cliente } from '../model/cliente';

@Injectable()
export class ClientesService {

  private clientes: Cliente[] = [];

  constructor() {
    let cliente1 = new Cliente();
    cliente1.nome = 'cliente1';
    cliente1.cpf = '000.000.000-00';
    cliente1.endereco = 'av. teste';
    cliente1.telefone = '(75)9xxxx-xxxx';
    cliente1.valor = 100.00;

    let cliente2 = new Cliente();
    cliente2.nome = 'cliente2';
    cliente2.cpf = '000.000.000-00';
    cliente2.endereco = 'av. teste';
    cliente2.telefone = '(75)9xxxx-xxxx';
    cliente2.valor = 200.00;

    let cliente3 = new Cliente();
    cliente3.nome = 'cliente3';
    cliente3.cpf = '000.000.000-00';
    cliente3.endereco = 'av. teste';
    cliente3.telefone = '(75)9xxxx-xxxx';
    cliente3.valor = 300.00;

    this.clientes.push(cliente1);
    this.clientes.push(cliente2);
    this.clientes.push(cliente3);
  }

  getClientes(): Cliente[] {
    return this.clientes;
  }

  addCliente(cliente: Cliente){
    this.clientes.push(cliente);
  }

  getFuncionarioByName(nome: string): Cliente{
    return this.clientes.find(cliente => cliente.nome === nome);
  }


}
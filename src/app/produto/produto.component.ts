import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent {
constructor(
  private produtoService:ProdutoService,
  private snackbar: MatSnackBar
) { this.buscaProduto()}


  //Inicializa o formulário
produto:FormGroup = new FormGroup ({
id: new FormControl(null),
descricao: new FormControl('',Validators.required),
unid_medida: new FormControl('',Validators.required),
valor: new FormControl('',Validators.required),
tipo: new FormControl('',Validators.required),

}) 


//Métodos dos controles do formulário
onIncluir(){
  this.produto.reset();
  this.produto.enable();
  }
  
  onSalvar(){
    //Guarda as informações em variável para melhorar o acesso
  let info =this.produto.value;
  //Verifica se está inserindo ou alterando com base do valor 
  //do ID (se for null, está inserindo, se não está alterando)
   if(info.id == null){
  
    this.produtoService.addProduto(info).subscribe({
      next:(resposta)=>{
        console.log(resposta);
         this.snackbar.open(
          "Produto adicionado com sucesso!",
          "Ok",
          {
            verticalPosition:'top',
            horizontalPosition:'end',
            duration:3000
          }
         )
         this.onCancelar()
      },
      error:(erro)=>{
        console.log(erro);
        this.snackbar.open(
          "Oh não, algo aconteceu de errado!",
          "Ok",
          {
            verticalPosition:'top',
            horizontalPosition:'end',
            duration:3000
          }
        
    )
  }})
   }else{
    //Irá alterar o usuário do banco de dados
  
   } 
  
  }
  
  
  
  onCancelar(){
  this.produto.reset();
  this.produto.disable();
  }
  
  //Função para buscar as informações e usuários
  
  relatorio:any[] = [];
  
  buscaProduto(){
    this.produtoService.getProduto().subscribe({
      next:(resposta)=>{
        console.log(resposta);
        this.relatorio = resposta.body;
      },
      error:(erro)=>{
        console.log(erro);
      }
  
    })
  }
  
}
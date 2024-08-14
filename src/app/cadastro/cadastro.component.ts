import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  constructor(
    private cadastroService:CadastroService,
    private snackbar: MatSnackBar
  ){
    this.buscaCadastro()
  }
  
  
    //Inicializa o formulário
  cadastro:FormGroup = new FormGroup ({
  id: new FormControl(null),
  apelido: new FormControl('',Validators.required),
  num_linhas: new FormControl('',Validators.required),
  num_colunas: new FormControl('',Validators.required),
  })
  
  
  //Métodos dos controles do formulário
  onIncluir(){
  this.cadastro.reset();
  this.cadastro.enable();
  }
  
  onSalvar(){
    //Guarda as informações em variável para melhorar o acesso
  let info =this.cadastro.value;
  //Verifica se está inserindo ou alterando com base do valor 
  //do ID (se for null, está inserindo, se não está alterando)
   if(info.id == null){
  
    this.cadastroService.addCadastro(info).subscribe({
      next:(resposta)=>{
        console.log(resposta);
         this.snackbar.open(
          "Cadastro adicionado com sucesso!",
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
  this.cadastro.reset();
  this.cadastro.disable();
  }
  
  //Função para buscar as informações e usuários
  
  relatorio:any[] = [];
  
  buscaCadastro(){
    this.cadastroService.getCadastro().subscribe({
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

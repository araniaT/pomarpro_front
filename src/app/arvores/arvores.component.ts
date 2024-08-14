import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArvoresService } from '../services/arvores.service';

@Component({
  selector: 'app-arvores',
  templateUrl: './arvores.component.html',
  styleUrl: './arvores.component.scss'
})
export class ArvoresComponent {

  constructor(
    private arvoresService:ArvoresService,
    private snackbar: MatSnackBar
  ){
    this.buscaArvores()
  }
  
  
    //Inicializa o formulário
  arvores:FormGroup = new FormGroup ({
  id: new FormControl(null),
  defensivo: new FormControl('',Validators.required),
  fertilizante: new FormControl('',Validators.required),
  ultima_verifacao: new FormControl('',Validators.required),
  coluna: new FormControl('',Validators.required),
  linha: new FormControl('',Validators.required),
  tipo: new FormControl('',Validators.required),
  situacao: new FormControl('',Validators.required),
  pomar: new FormControl('',Validators.required),
  })
  
  
  //Métodos dos controles do formulário
  onIncluir(){
  this.arvores.reset();
  this.arvores.enable();
  }
  
  onSalvar(){
    //Guarda as informações em variável para melhorar o acesso
  let info =this.arvores.value;
  //Verifica se está inserindo ou alterando com base do valor 
  //do ID (se for null, está inserindo, se não está alterando)
   if(info.id == null){
  
    this.arvoresService.addArvores(info).subscribe({
      next:(resposta)=>{
        console.log(resposta);
         this.snackbar.open(
          "Árvore adicionada com sucesso!",
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
  this.arvores.reset();
  this.arvores.disable();
  }
  
  //Função para buscar as informações e usuários
  
  relatorio:any[] = [];
  
  buscaArvores(){
    this.arvoresService.getArvores().subscribe({
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

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColheitaService } from '../services/colheita.service';

@Component({
  selector: 'app-colheita',
  templateUrl: './colheita.component.html',
  styleUrl: './colheita.component.scss'
})
export class ColheitaComponent {
  
  constructor(
    private colheitaService:ColheitaService,
    private snackbar: MatSnackBar
  ){
    this.buscaColheita()
  }
  
  
    //Inicializa o formulário
  colheita:FormGroup = new FormGroup ({
  id: new FormControl(null),
  quantidade: new FormControl('',Validators.required),
  dt_colheita: new FormControl('',Validators.required),
  arvore_id: new FormControl('',Validators.required),

  })
  
  
  //Métodos dos controles do formulário
  onIncluir(){
  this.colheita.reset();
  this.colheita.enable();
  }
  
  onSalvar(){
    //Guarda as informações em variável para melhorar o acesso
  let info =this.colheita.value;
  //Verifica se está inserindo ou alterando com base do valor 
  //do ID (se for null, está inserindo, se não está alterando)
   if(info.id == null){
  
    this.colheitaService.addColheita(info).subscribe({
      next:(resposta)=>{
        console.log(resposta);
         this.snackbar.open(
          "Colheita adicionada com sucesso!",
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
  this.colheita.reset();
  this.colheita.disable();
  }
  
  //Função para buscar as informações e usuários
  
  relatorio:any[] = [];
  
  buscaColheita(){
    this.colheitaService.getColheita().subscribe({
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

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovimentoService } from '../services/movimento.service';


@Component({
  selector: 'app-movimento',
  templateUrl: './movimento.component.html',
  styleUrl: './movimento.component.scss'
})
export class MovimentoComponent {

  constructor(
    private movimentoService:MovimentoService,
    private snackbar: MatSnackBar
  ){
    this.buscaMovimento()
  }
  
  
    //Inicializa o formulário
  movimento:FormGroup = new FormGroup ({
  id: new FormControl(null),
  tipo: new FormControl('',Validators.required),
  produto: new FormControl('',Validators.required),
  quantidade: new FormControl('',Validators.required),
  })
  
  onIncluir(){
    this.movimento.reset();
    this.movimento.enable();
    }
    
    onSalvar(){
      //Guarda as informações em variável para melhorar o acesso
    let info =this.movimento.value;
    //Verifica se está inserindo ou alterando com base do valor 
    //do ID (se for null, está inserindo, se não está alterando)
     if(info.id == null){
    
      this.movimentoService.addMovimento(info).subscribe({
        next:(resposta)=>{
          console.log(resposta);
           this.snackbar.open(
            "Movimentação adicionada com sucesso!",
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
    this.movimento.reset();
    this.movimento.disable();
    }
    
    //Função para buscar as informações e usuários
    
    relatorio:any[] = [];
    
    buscaMovimento(){
      this.movimentoService.getMovimento().subscribe({
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

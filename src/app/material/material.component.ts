import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialService } from '../services/material.service';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss'
})

export class MaterialComponent {

  constructor(
    private materialService:MaterialService,
    private snackbar:MatSnackBar
  ) {this.buscaMaterial()}
  
  
    material:FormGroup = new FormGroup ({
      id: new FormControl(null),
      nome: new FormControl('',Validators.required),
      valor: new FormControl('',Validators.required),
      fornecedor: new FormControl('',Validators.required),
      tipo: new FormControl('',Validators.required),
      
    
 } )
 

//Métodos dos controles do formulário
onIncluir(){
  this.material.reset();
  this.material.enable();
  }
  
  onSalvar(){
    //Guarda as informações em variável para melhorar o acesso
  let info =this.material.value;
  //Verifica se está inserindo ou alterando com base do valor 
  //do ID (se for null, está inserindo, se não está alterando)
   if(info.id == null){
  
    this.materialService.addMaterial(info).subscribe({
      next:(resposta)=>{
        console.log(resposta);
         this.snackbar.open(
          "Material adicionado com sucesso!",
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
  this.material.reset();
  this.material.disable();
  }
  
  //Função para buscar as informações e usuários
  
  relatorio:any[] = [];
  
  buscaMaterial(){
    this.materialService.getMaterial().subscribe({
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
  



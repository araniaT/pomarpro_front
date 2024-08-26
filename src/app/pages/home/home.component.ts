import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  HomeService  } from '../../services/home.service';



@Component({
  selector: 'app-produto',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private HomeService:HomeService,
    private snackbar:MatSnackBar

  ){
    this.buscaHome();
    this.buscaHomeS()
  }



  produto:FormGroup = new FormGroup({ 
    id:new FormControl(null),

    t_descricao:new FormControl('', Validators.required),
    quantidade:new FormControl('',Validators.required ),
    p_descricao:new FormControl('',Validators.required),
    St_descricao:new FormControl('', Validators.required),
    Squantidade:new FormControl('',Validators.required ),
    Sp_descricao:new FormControl('',Validators.required),




  })

  relatorioE:any[] = [];
  relatorioS:any[] = [];

  relatorioTotal:any[] = [];

  buscaHome(){
    this.HomeService.getHome().subscribe({
      next:(resposta)=>{
        console.log(resposta);
        this.relatorioE = resposta.body;
        this.ajustaRelatorio()
    },
    error:(erro)=>{
      console.log(erro)
    }

    })
  }

  buscaHomeS(){
    this.HomeService.getHomeS().subscribe({
      next:(resposta)=>{
        console.log(resposta);
        this.relatorioS = resposta.body;
        this.ajustaRelatorio()
    },
    error:(erro)=>{
      console.log(erro)
    }

    })
  }

  ajustaRelatorio(){
    this.relatorioE.forEach(e=>{
      this.relatorioS.forEach(s=>{
        if(e.id == s.id){
          this.relatorioTotal.push({
            id:e.id,
            descricao:e.p_descricao,
            quantidade:(e.quantidade - s.quantidade)
          })
        }
      })
    })
    console.log(this.relatorioTotal)
  }

  }
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss'
})
export class MaterialComponent {

}


formulario:materiais = new FormGroup ({
  id: new FormControl(null),
  nome: new FormControl('',Validators.required),
  sobrenome: new FormControl('',Validators.required),
  telefone: new FormControl('',Validators.required),
  email: new FormControl('',Validators.required),
  endereco: new FormControl('',Validators.required),
  login: new FormControl('',Validators.required),
  })
  
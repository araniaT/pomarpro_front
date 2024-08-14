import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArvoresService {



constructor(private http:HttpClient) { }


public addArvores(info:any):Observable<any>{
  return this.http.post(
    'http://localhost:3000/arvores/add',
  {info},
   {observe:'response'}
  )
}

//Função de busca de usuários
 public getArvores():Observable<any>{
  return this.http.get('http://localhost:3000/arvores/buscaTodos',
    {observe:'response'}
  )
 }
 
 
}

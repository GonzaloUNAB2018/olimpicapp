import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the AngularFireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AngularFireProvider {

  usr = {
    apodo: null,
    id: null,
    nombre: null,
    apellidos: null,
    fotoPerfil: null
  }

  constructor(
    public http: HttpClient,
    private afDb: AngularFireDatabase
    ) {
    console.log('Hello AngularFireProvider Provider');
  }

  revisarDatosDeUsuario(uid){
    return this.afDb.object('Usuarios/'+uid);
  }

  enviarDatosEditadosDeUsuario(uid, user){
    this.usr.nombre = user.nombre;
    this.usr.apellidos = user.apellidos;
    this.usr.apodo = user.apodo;
    this.usr.id = user.id;
    //this.usr.fotoPerfil = user.fotoPerfil;
    console.log(this.usr);
    this.afDb.database.ref('Usuarios/'+uid+'/Datos').set(user).then(()=>{
      this.afDb.database.ref('Publicos/Usuarios/'+this.usr.id+'/Datos').set(this.usr);
    })
  }

}

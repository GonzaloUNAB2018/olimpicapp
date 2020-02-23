import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../modals/user';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {} as User;

  fotoPerfil: string;
  uid: string;
  usuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    private afAuth: AngularFireAuth
    ) {
      this.uid = this.afAuth.auth.currentUser.uid;
      this.afProvider.revisarDatosDeUsuario(this.uid).valueChanges().subscribe(user =>{
        console.log(user);
        this.usuario = user;
        this.fotoPerfil = this.usuario.Datos.fotoPerfil
      })
      
  }

}

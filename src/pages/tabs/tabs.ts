import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from 'ionic-angular';
import { EditarDatosPerfilPage } from '../editar-datos-perfil/editar-datos-perfil';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  uid : string;
  userData: any;

  constructor(
    private afProvider: AngularFireProvider,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController
  ) {

    this.leerDatos()
    
  }

  leerDatos(){
    this.uid = this.afAuth.auth.currentUser.uid;
    this.afProvider.revisarDatosDeUsuario(this.uid).valueChanges().subscribe(user=>{
      this.userData = user;
      if(!this.userData){
        this.navCtrl.setRoot(EditarDatosPerfilPage, {uid:this.uid});
      }else{

      }
    })
  }
}

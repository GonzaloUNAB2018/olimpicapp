import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { TabsPage } from '../tabs/tabs';
import { RegistroPage } from '../registro/registro';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    if(this.email){
      if(this.password){
        let loadLogin = this.loadingCtrl.create({
          content: 'Iniciando Sesión'
        });
        loadLogin.present();
        this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(user=>{
          if(user){
            this.navCtrl.setRoot(TabsPage, {email: this.email});
            loadLogin.dismiss();
          }
        }).catch(e=>{
          alert(e);
          console.log(e);
          loadLogin.dismiss();
        })
      }else{
        alert('Falta la Password')
      }
    }else{
      alert('Falta email')
    }
  }

  registro(){
    this.navCtrl.push(RegistroPage, {email: this.email, password: this.password});
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  email: string;
  password: string;
  c_password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) {
      this.email = navParams.get('email');
      if(!this.email){
        this.email = null
      }
      this.password = navParams.get('password');
      if(!this.password){
        this.password = null
      }

      console.log(this.email, this.password)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registro(){
    if(this.email){
      if(this.password===this.c_password){
        let loadRegistro = this.loadingCtrl.create({
          content: 'Creando Usuario'
        });
        loadRegistro.present();
        this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(user=>{
          if(user){
            this.afAuth.auth.signOut().then(()=>{
              this.navCtrl.pop();
              loadRegistro.dismiss().then(()=>{
                this.presentToast();
              })
            })
          }
        }).catch(e=>{
          alert(e);
          console.log(e);
          loadRegistro.dismiss();
        })
      }else{
        alert('Error de password')
      }
    }else{
      alert('Falta Email')
    }
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Usuario agregado. Inicie sesión',
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


}

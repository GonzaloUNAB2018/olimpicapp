import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../modals/user';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-editar-datos-perfil',
  templateUrl: 'editar-datos-perfil.html',
})
export class EditarDatosPerfilPage {

  user = {} as User;
  uid : string;

  urlFoto = './assets/imgs/profile.png';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private camera: Camera
    ) {
      this.uid = navParams.get('uid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarDatosPerfilPage');
  }

  enviarDatos(){
    if(this.user.nombre&&this.user.apellidos&&this.user.apodo&&this.user.fono&&this.user.ciudad&&this.user.region){
      this.user.fotoPerfil = this.urlFoto;
      let load = this.loadingCtrl.create({
        content: 'Guardando Datos de Usuario'
      });
      load.present().then(()=>{
        this.user.id = Date.now();
        this.afProvider.enviarDatosEditadosDeUsuario(this.uid, this.user);
        this.navCtrl.setRoot(TabsPage).then(()=>{
          load.dismiss();
        }).catch(e=>{
          alert(e);
          console.log(e);
        })
      });
    }else{
      alert('Faltan datos');
    }
  }

  cambioFotoPerfil(){
    //this.presentToast();
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.urlFoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
    
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'No es posible cambiar foto. En desarrollo',
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{
      let load = this.loadingCtrl.create({
        content : 'Cerrando Sesión',
        duration : 2000
      });
      load.present().then(()=>{
        this.navCtrl.setRoot(LoginPage);
      })
    })
  }

}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';

//FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireProvider } from '../providers/angular-fire/angular-fire';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { EditarDatosPerfilPage } from '../pages/editar-datos-perfil/editar-datos-perfil';


const firebaseConfig = {
  apiKey: "AIzaSyBAWpCrR_HDVFc4H4JLwREB8kgZeDzuncA",
  authDomain: "olimpicapp.firebaseapp.com",
  databaseURL: "https://olimpicapp.firebaseio.com",
  projectId: "olimpicapp",
  storageBucket: "olimpicapp.appspot.com",
  messagingSenderId: "585936612172",
  appId: "1:585936612172:web:64a8746ea87e139e5f7de9",
  measurementId: "G-H891DKQ229"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistroPage,
    EditarDatosPerfilPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistroPage,
    EditarDatosPerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireProvider,
    Camera,
  ]
})
export class AppModule {}

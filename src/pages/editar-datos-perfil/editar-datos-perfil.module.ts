import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarDatosPerfilPage } from './editar-datos-perfil';

@NgModule({
  declarations: [
    EditarDatosPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarDatosPerfilPage),
  ],
})
export class EditarDatosPerfilPageModule {}

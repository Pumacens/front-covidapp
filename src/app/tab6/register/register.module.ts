import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET} from '@angular/fire/storage'
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule

  ],
  declarations: [RegisterPage],
  providers: [
    { provide: BUCKET, useValue: 'covidapp-9a010.appspot.com' }
  ]
})
export class RegisterPageModule {}

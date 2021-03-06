import { Component, OnInit } from '@angular/core';
import { AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { PrincipalPage } from '../principal/principal.page';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  phone: string;
  age: string;
  name: string;
  email: string;
  city: string;
  state: string;
  address: string;
  password: string;
  password2: string;


  constructor(private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public alertController: AlertController,
    private navController: NavController,
    private router: Router
    //public navCtrl: NavController
    ) { }

  ngOnInit() {
    
  }

  async presentAlert(error,mensaje) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: error,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  signUp(){
    if(this.age !== undefined && this.age!== ''
    && this.phone !== undefined && this.phone!== ''
    && this.email !== undefined && this.email!== ''
    && this.city !== undefined && this.city!== ''
    && this.password !== undefined && this.password!== ''
    && this.password2 !== undefined && this.password2!== ''
    && this.state !== undefined && this.state!== ''
    && this.name !== undefined && this.name!== ''
    && this.address !== undefined && this.address!== ''){
      if(this.password==this.password2){
        this.auth.createUserWithEmailAndPassword(this.email,this.password).then(
          (user)=>{
            user.user.updateProfile({displayName: this.name});
            this.firestore.collection('users').doc(user.user.uid).set({
              phone: this.phone,
              age: this.age,
              displayName: this.name,
              city: this.city,
              state: this.state,
              address: this.address,
              email: this.email
          });
          this.goToPrincipal();
          let err = 'Nuevo registro';
          let mensa = 'Registro del usuario '+this.email + ' exitoso';
          this.presentAlert(err,mensa);
          this.goToLogin();
          }
        ).catch((error)=>{
          this.presentAlert(error.code,error.message);
        });
      }else{
        let err = 'Contraseña no coincide';
        let mensa = 'Por favor repita la contraseña';
        this.presentAlert(err,mensa);
      }
    } else{
      let err = 'Campos vacíos';
      let mensa = 'Por favor diligencie todos los campos';
      this.presentAlert(err,mensa);
    }
    
  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'img_archivo';
    const task = this.storage.upload(filePath, file);
  }

  goToPrincipal(){
    this.router.navigateByUrl('/tabs/tab6/principal');
  }
  
  goToLogin(){
    this.router.navigateByUrl('/tabs/tab6');
  } 
}

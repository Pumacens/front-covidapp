import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-crear-reportes',
  templateUrl: './crear-reportes.page.html',
  styleUrls: ['./crear-reportes.page.scss'],
})
export class CrearReportesPage implements OnInit {

  nombre: string;
  telefono: string;
  correo: string;
  ciudad: string;
  tipo: string;
  descripcion: string;
  categoria: string;
  currentUser: any = {} ;
  data: [];
  idUser: string;

  constructor(private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public alertController: AlertController,
    ) { }

  ngOnInit() {
    /* this.auth.currentUser.then((user)=>{
      this.currentUser =  this.firestore.collection('users').doc(user.uid).get().subscribe((value)=>{
      this.currentUser = value.data();
      });
    }).catch((error)=>{
      console.log(error);
    }) */
    //console.log(this.logUser.currentUser);
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

  createReport(){
    
    if(this.nombre !== undefined && this.nombre!== ''
    && this.categoria !== undefined && this.categoria!== ''
    && this.tipo !== undefined && this.tipo!== ''
    && this.correo !== undefined && this.correo!== ''
    && this.ciudad !== undefined && this.ciudad!== ''
    && this.descripcion !== undefined && this.descripcion!== ''
    && this.telefono !== undefined && this.telefono!== ''){
      this.auth.currentUser.then((user)=>{

        this.firestore.collection('reports').add({
          displayname: this.nombre, 
          id_user: user.uid,
          tipo: this.tipo,
          correo: user.email,
          categoria: this.categoria,
          nombre: this.nombre,
          telefono: this.telefono,
          ciudad: this.ciudad,
          descripcion: this.descripcion
        });     
        let err = 'Crear reporte';
        let mensa = 'Has creado un reporte de: '+this.tipo+' nuevo exitosamente';
        this.presentAlert(err,mensa);
      }).catch((error)=>{
        this.presentAlert(error.code,error.message);
      })
    }else{
      let err = 'Campos vacíos';
      let mensa = 'Por favor diligencie todos los campos';
      this.presentAlert(err,mensa);
    }
    
  }

}

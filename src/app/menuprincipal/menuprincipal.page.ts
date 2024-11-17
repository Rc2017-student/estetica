import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.page.html',
  styleUrls: ['./menuprincipal.page.scss'],
})
export class MenuprincipalPage implements OnInit {
  user: {
    id: number;
    nombre: string;
    username: string;
    password: string;
    tienda: string;
    urlTienda: string;
  } = {
    id: 0,
    nombre: '',
    username: '',
    password: '',
    tienda: '',
    urlTienda: '',
  };

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }
  }

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem('currentUser');
    this.navCtrl.navigateRoot('/home'); // Redirige al inicio de sesión
  }
}

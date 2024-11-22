import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  notificaciones: { mensaje: string; fecha: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Cargar notificaciones guardadas del localStorage
    const notificacionesGuardadas = localStorage.getItem('notificaciones');
    if (notificacionesGuardadas) {
      this.notificaciones = JSON.parse(notificacionesGuardadas);
    }
  }

  agregarNotificacion(mensaje: string) {
    // Crear nueva notificación con la fecha actual
    const nuevaNotificacion = { mensaje, fecha: new Date().toLocaleString() };
    this.notificaciones.push(nuevaNotificacion);

    // Guardar notificaciones actualizadas en localStorage
    localStorage.setItem('notificaciones', JSON.stringify(this.notificaciones));
  }

  limpiarNotificaciones() {
    // Limpiar todas las notificaciones
    this.notificaciones = [];
    localStorage.removeItem('notificaciones');
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}

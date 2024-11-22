import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  // Campos para el formulario
  txtNombreServicio: string = '';
  txtDescripcionServicio: string = '';
  txtPrecioServicio: number = 0;
  txtDuracionServicio: number = 0;
  txtPromocion: string = '';
  txtAdicionales: string = "";

  // Lista de servicios guardados
  servicios: {
    nombre: string;
    descripcion: string;
    precio: number;
    duracion: number;
    promocion: string;
    adicionales: string;
  }[] = [];

  constructor(private router: Router) {
    // Recuperar servicios guardados del localStorage
    const serviciosGuardados = localStorage.getItem('servicios');
    if (serviciosGuardados) {
      this.servicios = JSON.parse(serviciosGuardados);
    }
  }


  ngOnInit() { }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
  // Guardar un nuevo servicio
  guardarServicio() {
    //this.notificacionesService.agregarNotificacion(`Servicio "${this.txtNombreServicio}" agregado.`);
    // Notificar adición de nuevo incidente
    let notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
    notificaciones.push({
      mensaje: `Nuevo servicio agregado ${this.txtNombreServicio}`,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));

    alert('Incidente guardado exitosamente');
    if (
      this.txtNombreServicio === '' ||
      this.txtDescripcionServicio === '' ||
      this.txtPrecioServicio === 0 ||
      this.txtDuracionServicio === 0 ||
      this.txtAdicionales === ""
    ) {
      alert('Llena todos los campos antes de guardar');
      return;
    }

    // Agregar el nuevo servicio a la lista
    this.servicios.push({
      nombre: this.txtNombreServicio,
      descripcion: this.txtDescripcionServicio,
      precio: this.txtPrecioServicio,
      duracion: this.txtDuracionServicio,
      promocion: this.txtPromocion,
      adicionales: this.txtAdicionales
    });

    // Limpiar los campos después de guardar
    this.txtNombreServicio = '';
    this.txtDescripcionServicio = '';
    this.txtPrecioServicio = 0;
    this.txtDuracionServicio = 0;
    this.txtPromocion = '';
    this.txtAdicionales = '';

    // Guardar en localStorage
    localStorage.setItem('servicios', JSON.stringify(this.servicios));
  }

  // Borrar un servicio
  borrarServicio(i: number) {

    let notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
    notificaciones.push({
      mensaje: `Servicio eliminado: ${this.servicios[i].nombre}`,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    this.servicios.splice(i, 1);
    localStorage.setItem('servicios', JSON.stringify(this.servicios));
  }

  // Editar un servicio
  editarServicio(i: number) {
    const servicio = this.servicios[i];
    this.txtNombreServicio = servicio.nombre;
    this.txtDescripcionServicio = servicio.descripcion;
    this.txtPrecioServicio = servicio.precio;
    this.txtDuracionServicio = servicio.duracion;
    this.txtPromocion = servicio.promocion;
    this.txtAdicionales = servicio.adicionales
    this.borrarServicio(i);
  }
}

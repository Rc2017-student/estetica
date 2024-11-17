import { Component, OnInit } from '@angular/core';

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
  txtInsumos: string = '';

  // Lista de servicios guardados
  servicios: {
    nombre: string;
    descripcion: string;
    precio: number;
    duracion: number;
    promocion: string;
    insumos: string;
  }[] = [];

  constructor() {
    // Recuperar servicios guardados del localStorage
    const serviciosGuardados = localStorage.getItem('servicios');
    if (serviciosGuardados) {
      this.servicios = JSON.parse(serviciosGuardados);
    }
  }

  ngOnInit() {}

  // Guardar un nuevo servicio
  guardarServicio() {
    if (
      this.txtNombreServicio === '' ||
      this.txtDescripcionServicio === '' ||
      this.txtPrecioServicio === 0 ||
      this.txtDuracionServicio === 0
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
      insumos: this.txtInsumos,
    });

    // Limpiar los campos después de guardar
    this.txtNombreServicio = '';
    this.txtDescripcionServicio = '';
    this.txtPrecioServicio = 0;
    this.txtDuracionServicio = 0;
    this.txtPromocion = '';
    this.txtInsumos = '';

    // Guardar en localStorage
    localStorage.setItem('servicios', JSON.stringify(this.servicios));
  }

  // Borrar un servicio
  borrarServicio(i: number) {
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
    this.txtInsumos = servicio.insumos;
    this.borrarServicio(i);
  }
}

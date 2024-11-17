import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  // Campos para el formulario
  txtFechaHora: string = '';
  txtEstilista: string = '';
  txtServicios: string[] = [];

  // Lista de estilistas predefinidos
  estilistasDisponibles: string[] = ['Ana', 'Carlos', 'Sofía', 'Luis'];

  // Lista de servicios disponibles, que ahora se llena con los servicios guardados
  serviciosDisponibles: { nombre: string }[] = [];

  // Lista de citas guardadas
  citas: {
    fechaHora: string;
    estilista: string;
    servicios: string[];
  }[] = [];

  constructor() {
    // Recuperar servicios guardados del localStorage
    const serviciosGuardados = localStorage.getItem('servicios');
    if (serviciosGuardados) {
      this.serviciosDisponibles = JSON.parse(serviciosGuardados);
    }

    // Recuperar citas guardadas del localStorage
    const citasGuardadas = localStorage.getItem('citas');
    if (citasGuardadas) {
      this.citas = JSON.parse(citasGuardadas);
    }
  }

  ngOnInit() {}

  // Guardar una nueva cita
  guardarCita() {
    if (this.txtFechaHora === '' || this.txtEstilista === '' || this.txtServicios.length === 0) {
      alert('Llena todos los campos antes de guardar');
      return;
    }

    // Agregar la nueva cita a la lista
    this.citas.push({
      fechaHora: this.txtFechaHora,
      estilista: this.txtEstilista,
      servicios: [...this.txtServicios],
    });

    // Limpiar los campos después de guardar
    this.txtFechaHora = '';
    this.txtEstilista = '';
    this.txtServicios = [];

    // Guardar en localStorage
    localStorage.setItem('citas', JSON.stringify(this.citas));
  }

  // Borrar una cita
  borrarCita(i: number) {
    this.citas.splice(i, 1);
    localStorage.setItem('citas', JSON.stringify(this.citas));
  }

  // Editar una cita
  editarCita(i: number) {
    const cita = this.citas[i];
    this.txtFechaHora = cita.fechaHora;
    this.txtEstilista = cita.estilista;
    this.txtServicios = [...cita.servicios];
    this.borrarCita(i);
  }
}

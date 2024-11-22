import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  // Campos para el formulario de cliente
  txtNombreCliente: string = '';
  txtTelefonoCliente: string = '';
  txtCorreoCliente: string = '';
  txtPreferencias: string = ''; // Preferencias del cliente

  // Campos para el registro de servicio
  fechaServicio: string = '';
  servicioSeleccionado: string = ''; // Servicio seleccionado
  serviciosDisponibles: { nombre: string, precio: number }[] = [];

  // Lista de clientes guardados
  clientes: {
    nombre: string;
    telefono: string;
    correo: string;
    preferencias: string;
    historial: {
      fecha: string;
      servicios: string[];
    }[];
    recompensas: number; // Puntos de fidelización
  }[] = [];

  constructor() {
    // Recuperar clientes guardados del localStorage
    const clientesGuardados = localStorage.getItem('clientes');
    if (clientesGuardados) {
      this.clientes = JSON.parse(clientesGuardados);
    }

    // Recuperar servicios guardados del localStorage
    const serviciosGuardados = localStorage.getItem('servicios');
    if (serviciosGuardados) {
      this.serviciosDisponibles = JSON.parse(serviciosGuardados);
    }
  }

  ngOnInit() { }

  // Guardar o editar un cliente
  guardarCliente() {
    if (this.txtNombreCliente === '' || this.txtTelefonoCliente === '' || this.txtCorreoCliente === '') {
      alert('Llena todos los campos antes de guardar');
      return;
    }

    const cliente = {
      nombre: this.txtNombreCliente,
      telefono: this.txtTelefonoCliente,
      correo: this.txtCorreoCliente,
      preferencias: this.txtPreferencias,
      historial: [],
      recompensas: 0, // Puntos de fidelización iniciales
    };

    // Buscar si el cliente ya existe
    const index = this.clientes.findIndex(c => c.telefono === this.txtTelefonoCliente);
    if (index !== -1) {
      // Editar cliente existente
      this.clientes[index] = cliente;
    } else {
      // Añadir cliente nuevo
      this.clientes.push(cliente);
    }

    //Notificacion de servicio realizado
    let notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
    notificaciones.push({
      mensaje: `Servicio realizado a ${this.txtNombreCliente}`,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));

    // Limpiar campos después de guardar
    this.txtNombreCliente = '';
    this.txtTelefonoCliente = '';
    this.txtCorreoCliente = '';
    this.txtPreferencias = '';

    // Guardar en localStorage
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  }

  // Registrar un servicio realizado por un cliente específico
  registrarServicio(i: number) {
    if (this.fechaServicio === '' || this.servicioSeleccionado === '') {
      alert('Llena todos los campos antes de registrar el servicio');
      return;
    }

    // Registrar servicio en el historial del cliente seleccionado
    this.clientes[i].historial.push({
      fecha: this.fechaServicio,
      servicios: [this.servicioSeleccionado],
    });

    // Sumar puntos de fidelización por el servicio registrado
    this.clientes[i].recompensas += 10; // Puedes cambiar 10 por cualquier cantidad de puntos que quieras asignar

    //Notificacion de servicio realizado
    let notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
    notificaciones.push({
      mensaje: `Servicio realizado a ${this.clientes[i].nombre}\n Puntos de recomensa: ${this.clientes[i].recompensas}`,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));

    // Limpiar los campos después de registrar el servicio
    this.fechaServicio = '';
    this.servicioSeleccionado = '';

    // Guardar en localStorage
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  }

  // Borrar un cliente
  borrarCliente(i: number) {
    //Notificacion de borrar cliente
    let notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
    notificaciones.push({
      mensaje: `Cliente eliminado: ${this.clientes[i].nombre}`,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    this.clientes.splice(i, 1);
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  }

  // Editar un cliente
  editarCliente(i: number) {
    const cliente = this.clientes[i];
    this.txtNombreCliente = cliente.nombre;
    this.txtTelefonoCliente = cliente.telefono;
    this.txtCorreoCliente = cliente.correo;
    this.txtPreferencias = cliente.preferencias;
    this.borrarCliente(i);
  }
}

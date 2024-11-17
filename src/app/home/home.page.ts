import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importamos NavController

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Campos de entrada
  txtNombre: string = '';
  txtEmail: string = '';
  txtPassword: string = '';
  txtRol: string = '';
  rememberMe: boolean = false;

  // Lista de usuarios
  usuarios: { nombre: string; email: string; password: string; rol: string }[] = [];

  // Estado de la vista
  isRegistering: boolean = false;

  constructor(private navCtrl: NavController) { // Inyectamos NavController
    // Cargar datos iniciales
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    }

    // Cargar credenciales si "Recordar contraseña" estaba activado
    const credenciales = localStorage.getItem('credenciales');
    if (credenciales) {
      const { email, password } = JSON.parse(credenciales);
      this.txtEmail = email;
      this.txtPassword = password;
      this.rememberMe = true;
    }
  }

  // Alternar entre registro e inicio de sesión
  toggleView() {
    this.isRegistering = !this.isRegistering;
    this.limpiarCampos();
  }

  // Limpiar campos de entrada
  limpiarCampos() {
    this.txtNombre = '';
    this.txtEmail = '';
    this.txtPassword = '';
    this.txtRol = '';
    this.rememberMe = false;
  }

  // Registrar un usuario
  guardarUsuario() {
    if (!this.txtNombre || !this.txtEmail || !this.txtPassword || !this.txtRol) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = this.usuarios.find((user) => user.email === this.txtEmail);
    if (usuarioExistente) {
      alert('El usuario ya está registrado.');
      return;
    }

    // Agregar usuario
    this.usuarios.push({
      nombre: this.txtNombre,
      email: this.txtEmail,
      password: this.txtPassword,
      rol: this.txtRol,
    });

    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    alert('Usuario registrado con éxito.');
    this.toggleView();
  }

  // Iniciar sesión
  login() {
    const usuario = this.usuarios.find(
      (user) => user.email === this.txtEmail && user.password === this.txtPassword
    );

    if (usuario) {
      alert(`Bienvenido, ${usuario.nombre} (${usuario.rol})`);

      // Guardar credenciales si "Recordar contraseña" está activado
      if (this.rememberMe) {
        localStorage.setItem(
          'credenciales',
          JSON.stringify({ email: this.txtEmail, password: this.txtPassword })
        );
      } else {
        localStorage.removeItem('credenciales');
      }

      this.limpiarCampos();

      // Redirigir al menú principal
      this.navCtrl.navigateForward('/menuprincipal'); // Cambia '/menuprincipal' por la ruta de tu menú
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { CuentasVista } from 'src/cuentas-vista/entities/cuentas-vista.entity';

@Injectable()
export class UsuariosService {
  usuario: Usuario[] = [];

  constructor() {
    this.usuario.push(new Usuario(1, 'Juan', '123@123.cl', '12345'));
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const nuevoUsuario = new Usuario(
        this.usuario.length + 1,
        createUsuarioDto.nombre,
        createUsuarioDto.correoElectronico,
        createUsuarioDto.contrasena
    );

    // Agregar cuentas vista al usuario si están presentes en el DTO
    if (createUsuarioDto.cuentasVista && createUsuarioDto.cuentasVista.length > 0) {
        for (const cuentaId of createUsuarioDto.cuentasVista) {
            const cuentaVista = new CuentasVista(cuentaId, nuevoUsuario.id, true); // Crear una cuenta vista habilitada por defecto
            nuevoUsuario.cuentasVista.push(cuentaVista);
        }
    }

    this.usuario.push(nuevoUsuario);
    return nuevoUsuario;
}

  findAll(nombre: string): Usuario[] {
    let usuariosFiltrados = this.usuario;

    if (nombre) {
      const nombreLowerCase = nombre.toLowerCase();
      usuariosFiltrados = this.usuario.filter((usuario: Usuario) =>
        usuario.nombre.toLowerCase().includes(nombreLowerCase)
      );
    }

    // Asegurarse de que cuentasVista esté siempre presente como un array vacío si no tiene cuentas
    usuariosFiltrados.forEach((usuario) => {
      if (!usuario.cuentasVista) {
        usuario.cuentasVista = [];
      }
    });

    return usuariosFiltrados;
  }

  findOne(id: number): Usuario {
    const usuario = this.usuario.find((usuario) => usuario.id == id);

    // Asegurarse de que cuentasVista esté siempre presente como un array vacío si no tiene cuentas
    if (usuario && !usuario.cuentasVista) {
      usuario.cuentasVista = [];
    }

    return usuario;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = this.usuario.find((u: Usuario) => u.id == id);

    if (!usuario) {
      return null; // Usuario no encontrado
    }

    // Actualizar solo email y password si están presentes en el DTO
    usuario.correoElectronico = updateUsuarioDto.correoElectronico || usuario.correoElectronico;
    usuario.contrasena = updateUsuarioDto.contrasena || usuario.contrasena;

    return usuario; // Retorna el usuario actualizado
  }

  remove(id: number): boolean {
    const usuarioIndex = this.usuario.findIndex(
      (usuario: Usuario) => usuario.id == id
    );

    if (usuarioIndex == -1) {
      return false; // Usuario no encontrado
    }

    this.usuario.splice(usuarioIndex, 1); // Elimina el usuario
    return true; // Retorna true si el usuario fue eliminado
  }
}
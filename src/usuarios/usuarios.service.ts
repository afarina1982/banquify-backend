import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  usuario: Usuario[] = [];
  constructor() {
    this.usuario.push(new Usuario(1, 'Juan', '123@123.cl', '12345'))
  }

  create(createUsuarioDto: CreateUsuarioDto) {
    this.usuario.push(new Usuario(this.usuario.length + 1, createUsuarioDto.nombre, createUsuarioDto.correoElectronico, createUsuarioDto.contrasena));
  }

  findAll(nombre: string): Usuario[] {
    if (!nombre) {
      return this.usuario;
    }
  
    const nombreLowerCase = nombre.toLowerCase();
    return this.usuario.filter((usuario: Usuario) =>
      usuario.nombre.toLowerCase().includes(nombreLowerCase)
    );
  }
  
  findOne(id: number) {
    return this.usuario.find((usuario) => usuario.id == id);
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
    const usuarioIndex = this.usuario.findIndex((usuario: Usuario) => usuario.id == id);
  
    if (usuarioIndex === -1) {
      return false; // Usuario no encontrado
    }
  
    this.usuario.splice(usuarioIndex, 1); // Elimina el usuario
    return true; // Retorna true si el usuario fue eliminado
  }
  
}


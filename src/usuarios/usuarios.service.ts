import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { CuentasVista } from 'src/cuentas-vista/entities/cuentas-vista.entity';
import { TipoTransaccion } from 'src/transacciones/dto/tipo-transaccion.enum';
import { Transaccione } from 'src/transacciones/entities/transaccione.entity';
import { CreateTransaccioneDto } from 'src/transacciones/dto/create-transaccione.dto';

@Injectable()
export class UsuariosService {
  usuario: Usuario[] = [];
  usuarioRepository: any;
  cuentasVistaRepository: any;
  transaccionRepository: any;

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
            const cuentaVista = new CuentasVista(+cuentaId, nuevoUsuario.id, true); 
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
  async realizarTransferencia(usuarioId: number, receptorId: number, monto: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
    }

    const cuentaVistaOrigen = await this.cuentasVistaRepository.findOne({ where: { usuarioId: usuario.id } });
    if (!cuentaVistaOrigen) {
        throw new BadRequestException('Usuario no tiene cuenta vista');
    }

    const cuentaVistaDestino = await this.cuentasVistaRepository.findOne({ where: { usuarioId: receptorId } });
    if (!cuentaVistaDestino) {
        throw new BadRequestException('Cuenta vista del receptor no encontrada');
    }

    if (cuentaVistaOrigen.saldo < monto) {
        throw new InternalServerErrorException('Saldo insuficiente');
    }

    cuentaVistaOrigen.saldo -= monto;
    cuentaVistaDestino.saldo += monto;

    const transaccionOrigen = new CreateTransaccioneDto();
    transaccionOrigen.cuentaVistaId = cuentaVistaOrigen.id;
    transaccionOrigen.monto = -monto;
    transaccionOrigen.tipoTransaccion = 'TRANSFERENCIA';
    transaccionOrigen.descripcion = `Transferencia a cuenta vista ${receptorId}`;

    const transaccionDestino = new CreateTransaccioneDto();
    transaccionDestino.cuentaVistaId = cuentaVistaDestino.id;
    transaccionDestino.monto = monto;
    transaccionDestino.tipoTransaccion = 'TRANSFERENCIA';
    transaccionDestino.descripcion = `Transferencia desde cuenta vista ${usuarioId}`;

    await this.transaccionRepository.save([transaccionOrigen, transaccionDestino]);

    usuario.puntos += 5;
    await this.usuarioRepository.save(usuario);

    return { message: 'Transferencia realizada con éxito' };
}
  
  async realizarAbono(usuarioId: string, monto: number): Promise<void> {
  const usuario = await this.usuarioRepository.findOne(usuarioId, { relations: ['cuentaVista'] });
  if (!usuario) {
    throw new NotFoundException('Usuario no encontrado');
  }

  const cuenta = usuario.cuentaVista;
  if (!cuenta) {
    throw new BadRequestException('El usuario no tiene cuenta vista asignada');
  }

  // Sumar el abono al saldo de la cuenta
  cuenta.saldo += monto;
  await this.cuentasVistaRepository.save(cuenta);

  // Crear una transacción
  const transaccion = this.transaccionRepository.create({
    cuentaVista: cuenta,
    monto: monto,
    tipo: TipoTransaccion.Deposito,
  });

  await this.transaccionRepository.save(transaccion);
}
async realizarRetiro(usuarioId: string, monto: number): Promise<void> {
  const usuario = await this.usuarioRepository.findOne(usuarioId, { relations: ['cuentaVista'] });
  if (!usuario) {
    throw new NotFoundException('Usuario no encontrado');
  }

  const cuenta = usuario.cuentaVista;
  if (!cuenta) {
    throw new BadRequestException('El usuario no tiene cuenta vista asignada');
  }

  if (cuenta.saldo < monto) {
    throw new InternalServerErrorException('Saldo insuficiente');
  }

  // Restar el monto del saldo de la cuenta
  cuenta.saldo -= monto;
  await this.cuentasVistaRepository.save(cuenta);

  // Crear una transacción
  const transaccion = this.transaccionRepository.create({
    cuentaVista: cuenta,
    monto: -monto,
    tipo: TipoTransaccion.Retiro,
  });

  await this.transaccionRepository.save(transaccion);
}
async obtenerTransacciones(usuarioId: string, tipo?: TipoTransaccion): Promise<Transaccione[]> {
  const usuario = await this.usuarioRepository.findOne(usuarioId, { relations: ['cuentaVista'] });
  if (!usuario) {
    throw new NotFoundException('Usuario no encontrado');
  }

  const cuenta = usuario.cuentaVista;
  if (!cuenta) {
    throw new BadRequestException('El usuario no tiene cuenta vista asignada');
  }

  const where = { cuentaVista: cuenta };
  if (tipo) {
    where['tipo'] = tipo;
  }

  return await this.transaccionRepository.find({ where });
}

}
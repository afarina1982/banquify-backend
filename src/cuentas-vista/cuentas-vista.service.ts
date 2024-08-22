import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuentasVistaDto } from './dto/create-cuentas-vista.dto';
import { UpdateCuentasVistaDto } from './dto/update-cuentas-vista.dto';
import { CuentasVista } from './entities/cuentas-vista.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class CuentasVistaService {
  cuentasVista: CuentasVista[] = [];

  constructor(private usuariosService: UsuariosService) { }


  async create(createCuentasVistaDto: CreateCuentasVistaDto): Promise<CuentasVista> {
    const usuario = await this.usuariosService.findOne(createCuentasVistaDto.idUsuario);

    if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${createCuentasVistaDto.idUsuario} no encontrado`);
    }

    const nuevaCuentaVista = new CuentasVista(
        this.cuentasVista.length + 1,
        createCuentasVistaDto.idUsuario,
        createCuentasVistaDto.habilitada,
    );
    
    this.cuentasVista.push(nuevaCuentaVista);

    // Agregar la cuenta vista al usuario
    usuario.cuentasVista.push(nuevaCuentaVista);

    return nuevaCuentaVista;
}
  findAll(habilitada?: boolean): CuentasVista[] {
    if (habilitada == undefined) {
      return this.cuentasVista;
    }
    return this.cuentasVista.filter((cuentaVista: CuentasVista) => cuentaVista.habilitada == habilitada);
  }

  findOne(id: number) {
    return this.cuentasVista.find((cuentaVista) => cuentaVista.id == id);
  }

  update(id: number, updateCuentasVistaDto: UpdateCuentasVistaDto) {
    const cuentaVista = this.cuentasVista.find(cuenta => cuenta.id == id);

    if (!cuentaVista) {
      return null;
    }

    // Actualiza el atributo 'habilitada'
    cuentaVista.habilitada = updateCuentasVistaDto.habilitada;

    // Devuelve la cuenta actualizada
    return cuentaVista;
  }

  remove(id: number) {
    const cuentaVistaIndex = this.cuentasVista.findIndex((cuentaVista: CuentasVista) => cuentaVista.id == id);
    if (cuentaVistaIndex == -1) {
      return false;
    } else {
      this.cuentasVista.splice(cuentaVistaIndex, 1);
      return true;
    }
  }
}

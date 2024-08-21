import { Injectable } from '@nestjs/common';
import { CreateCuentasVistaDto } from './dto/create-cuentas-vista.dto';
import { UpdateCuentasVistaDto } from './dto/update-cuentas-vista.dto';

@Injectable()
export class CuentasVistaService {
  create(createCuentasVistaDto: CreateCuentasVistaDto) {
    return 'This action adds a new cuentasVista';
  }

  findAll() {
    return `This action returns all cuentasVista`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuentasVista`;
  }

  update(id: number, updateCuentasVistaDto: UpdateCuentasVistaDto) {
    return `This action updates a #${id} cuentasVista`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuentasVista`;
  }
}

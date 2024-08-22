import { Injectable } from '@nestjs/common';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { Transaccione } from './entities/transaccione.entity';
import { TipoTransaccion } from './dto/tipo-transaccion.enum';
import { CuentasVista } from 'src/cuentas-vista/entities/cuentas-vista.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class TransaccionesService {
transacciones: Transaccione[] = [];

cuentasVistaDatabase: CuentasVista[] = [
  new CuentasVista(1, 1, true, []),
  new CuentasVista(2, 2, true, []),
];

constructor() {
  const emisor = this.cuentasVistaDatabase.find(c => c.id == 1);
  const receptor = this.cuentasVistaDatabase.find(c => c.id == 2);

  if (emisor && receptor) {
    this.transacciones.push(new Transaccione(1, 100, TipoTransaccion.Deposito, new Date(), emisor, receptor));
    this.transacciones.push(new Transaccione(2, 50, TipoTransaccion.Retiro, new Date(), emisor, receptor));
    this.transacciones.push(new Transaccione(3, 25, TipoTransaccion.Transferencia, new Date(), emisor, receptor));
  }
}

  create(createTransaccioneDto: CreateTransaccioneDto) {
    return 'This action adds a new transaccione';
  }

  findAll(tipo?: TipoTransaccion) {
    if (tipo) {
      return this.transacciones.filter(transaccion => transaccion.tipo === tipo);
    }
    return this.transacciones;
  }

  findOne(id: number) {
    return this.transacciones.find((transaccione) => transaccione.id == id);
  }

  update(id: number, updateTransaccioneDto: UpdateTransaccioneDto) {
    return `This action updates a #${id} transaccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaccione`;
  }
}

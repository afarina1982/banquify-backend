import { CuentasVista } from "src/cuentas-vista/entities/cuentas-vista.entity";
import { TipoTransaccion } from "../dto/tipo-transaccion.enum";

export class Transaccione {
    id: number;
    monto: number;
    tipo: TipoTransaccion;
    fecha: Date;
    emisor: CuentasVista;
    receptor: CuentasVista;

    constructor(id: number, monto: number, tipo: TipoTransaccion, fecha: Date, emisor: CuentasVista, receptor: CuentasVista) {
        this.id = id;
        this.monto = monto;
        this.tipo = tipo;
        this.fecha = fecha;
        this.emisor = emisor;
        this.receptor = receptor;
    }
}


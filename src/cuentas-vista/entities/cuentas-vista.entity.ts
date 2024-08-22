import { Transaccione } from "src/transacciones/entities/transaccione.entity";

export class CuentasVista {
    public id: number; // identificador numérico único, generado automáticamente
    public idUsuario: number; // id del Usuario (id del usuario al que pertenece la cuenta)
    public saldo: number; // saldo de la cuenta, inicialmente 0
    public habilitada: boolean; // habilitada: boolean
    public transacciones: Transaccione[]; // transacciones: Transaccion[]

    constructor(id: number, idUsuario: number, habilitada: boolean, transacciones: Transaccione[]=[]) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.saldo = 0;
        this.habilitada = habilitada;
        this.transacciones = transacciones;
    }
}
export class CuentasVista {
    public id: number; // identificador numérico único, generado automáticamente
    public idUsuario: number; // id del Usuario (id del usuario al que pertenece la cuenta)
    public saldo: number; // saldo de la cuenta, inicialmente 0
    public habilitada: boolean; // habilitada: boolean

    constructor(id: number, idUsuario: number, habilitada: boolean) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.saldo = 0;
        this.habilitada = habilitada;
    }
}
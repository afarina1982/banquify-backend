import { CuentasVista } from "src/cuentas-vista/entities/cuentas-vista.entity";

export class Usuario {
    public id: number; 
    public nombre: string; 
    public correoElectronico: string; 
    public contrasena: string; 
    public puntosAcumulados: number; 
    public cuentasVista: CuentasVista[]; 

    constructor(id: number, nombre: string, correoElectronico: string, contrasena: string) {
        this.id = id;
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.contrasena = contrasena;
        this.puntosAcumulados = 0;
        this.cuentasVista = []; 
    }   
}



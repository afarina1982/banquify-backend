export class Usuario {
    public id: number; // identificador numérico único, generado automáticamente
    public nombre: string; // nombre del usuario
    public correoElectronico: string; // correo electrónico del usuario
    public contrasena: string; // contraseña del usuario
    public puntosAcumulados: number; // número de puntos de recompensa acumulados

    constructor(id: number, nombre: string, correoElectronico: string, contrasena: string) {
        this.id = id;
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.contrasena = contrasena;
        this.puntosAcumulados = 0;
    }
    
}




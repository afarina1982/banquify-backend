import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @ApiProperty({ default: 'Su Nombre' })
    public nombre: string; // nombre del usuario
    
    @ApiProperty({ default: 'Su Correo Electrónico' })
    public correoElectronico: string; // correo electrónico del usuario

    @ApiProperty({ default: '12345' })
    public contrasena: string; // contraseña del usuario

    @ApiProperty({ default: [] })
    public cuentasVista: number[]; 
    
}

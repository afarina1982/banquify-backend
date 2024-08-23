
import { ApiProperty } from "@nestjs/swagger";
import { CreateCuentasVistaDto } from "src/cuentas-vista/dto/create-cuentas-vista.dto";

export class CreateUsuarioDto {
    @ApiProperty({ description: "Nombre del usuario", default: "Juan Pérez" })
    nombre: string;

    @ApiProperty({ description: "Correo electrónico del usuario", default: "juan.perez@example.com" })
    correoElectronico: string;

    @ApiProperty({ description: "Contraseña del usuario", default: "12345" })
    contrasena: string;

    @ApiProperty({ description: "Cuentas vista asociadas", type: [CreateCuentasVistaDto], default: [] })
    cuentasVista: CreateCuentasVistaDto[];
}
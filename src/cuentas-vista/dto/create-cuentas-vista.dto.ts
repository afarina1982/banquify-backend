import { ApiProperty } from "@nestjs/swagger";

export class CreateCuentasVistaDto {
    @ApiProperty({ default: 1 })
    idUsuario: number;
    @ApiProperty({ default: true })
    habilitada: boolean;
}

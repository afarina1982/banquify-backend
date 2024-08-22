import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty({ default: 'Su Correo Electrónico' })
    public correoElectronico: string; // correo electrónico del usuario
    @ApiProperty({ default: '12345' })
    public contrasena: string; // contraseña del usuario
}
import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentasVistaDto } from './create-cuentas-vista.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCuentasVistaDto extends PartialType(CreateCuentasVistaDto) {
    @ApiProperty({ default: true })
    habilitada: boolean;
}
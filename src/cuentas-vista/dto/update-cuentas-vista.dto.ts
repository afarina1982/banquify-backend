import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentasVistaDto } from './create-cuentas-vista.dto';

export class UpdateCuentasVistaDto extends PartialType(CreateCuentasVistaDto) {}

import { ApiProperty } from "@nestjs/swagger";

export class CreateTransaccioneDto {
    @ApiProperty({ description: 'ID de la cuenta vista asociada', example: 1 })
    cuentaVistaId: number;
  
    @ApiProperty({ description: 'Monto de la transacción', example: 100.0 })
    monto: number;
  
    @ApiProperty({ description: 'Descripción o detalles adicionales', example: 'Depósito inicial' })
    descripcion?: string;
  tipoTransaccion: string;
}


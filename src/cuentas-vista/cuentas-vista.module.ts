import { Module } from '@nestjs/common';
import { CuentasVistaService } from './cuentas-vista.service';
import { CuentasVistaController } from './cuentas-vista.controller';

@Module({
  controllers: [CuentasVistaController],
  providers: [CuentasVistaService],
})
export class CuentasVistaModule {}

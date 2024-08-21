import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TransaccionesModule } from './transacciones/transacciones.module';
import { CuentasVistaModule } from './cuentas-vista/cuentas-vista.module';

@Module({
  imports: [UsuariosModule, TransaccionesModule, CuentasVistaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

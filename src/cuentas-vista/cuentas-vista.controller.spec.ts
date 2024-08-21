import { Test, TestingModule } from '@nestjs/testing';
import { CuentasVistaController } from './cuentas-vista.controller';
import { CuentasVistaService } from './cuentas-vista.service';

describe('CuentasVistaController', () => {
  let controller: CuentasVistaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuentasVistaController],
      providers: [CuentasVistaService],
    }).compile();

    controller = module.get<CuentasVistaController>(CuentasVistaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

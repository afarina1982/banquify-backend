import { Test, TestingModule } from '@nestjs/testing';
import { CuentasVistaService } from './cuentas-vista.service';

describe('CuentasVistaService', () => {
  let service: CuentasVistaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuentasVistaService],
    }).compile();

    service = module.get<CuentasVistaService>(CuentasVistaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

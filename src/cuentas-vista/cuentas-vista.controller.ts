import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuentasVistaService } from './cuentas-vista.service';
import { CreateCuentasVistaDto } from './dto/create-cuentas-vista.dto';
import { UpdateCuentasVistaDto } from './dto/update-cuentas-vista.dto';

@Controller('cuentas-vista')
export class CuentasVistaController {
  constructor(private readonly cuentasVistaService: CuentasVistaService) {}

  @Post()
  create(@Body() createCuentasVistaDto: CreateCuentasVistaDto) {
    return this.cuentasVistaService.create(createCuentasVistaDto);
  }

  @Get()
  findAll() {
    return this.cuentasVistaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentasVistaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentasVistaDto: UpdateCuentasVistaDto) {
    return this.cuentasVistaService.update(+id, updateCuentasVistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentasVistaService.remove(+id);
  }
}

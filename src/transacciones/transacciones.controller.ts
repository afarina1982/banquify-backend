import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { Response } from 'express';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TipoTransaccion } from './dto/tipo-transaccion.enum';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}

  @Post()
  create(@Body() createTransaccioneDto: CreateTransaccioneDto) {
    return this.transaccionesService.create(createTransaccioneDto);
  }

@ApiQuery({name: 'tipo',required: false, description: 'Tipo de transacción', enum: TipoTransaccion, enumName: 'TipoTransaccion'})
  @Get()
  findAll(@Query('tipo') tipo: TipoTransaccion) {
    return this.transaccionesService.findAll(tipo);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Transaccion Encontrada' })
  @ApiResponse({ status: 404, description: 'Transaccion No Existe' })
  findOne(@Param('id') id: string, @Res() response: Response) {
const transaccione = this.transaccionesService.findOne(+id);
if (transaccione) {
  response.status(200).send({ message: 'Usuario encontrado exitosamente.', transaccione: transaccione });
} else {
  response.status(404).send({ error: 'Solicitud inválida, No Existe Transaccion' });
}

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransaccioneDto: UpdateTransaccioneDto) {
    return this.transaccionesService.update(+id, updateTransaccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transaccionesService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, ParseBoolPipe } from '@nestjs/common';
import { CuentasVistaService } from './cuentas-vista.service';
import { CreateCuentasVistaDto } from './dto/create-cuentas-vista.dto';
import { UpdateCuentasVistaDto } from './dto/update-cuentas-vista.dto';
import { Response } from 'express';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';


@Controller('cuentas-vista')
export class CuentasVistaController {
  constructor(private readonly cuentasVistaService: CuentasVistaService) { }


  @Post()
  @ApiResponse({ status: 201, description: 'Cuenta vista creada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Solicitud inválida. Usuario No Existe' })
  async create(@Body() createCuentasVistaDto: CreateCuentasVistaDto, @Res() response: Response) {
    try {
      // Intentar crear la cuenta vista
      const nuevaCuentaVista = await this.cuentasVistaService.create(createCuentasVistaDto);

      // Responder con éxito si se creó la cuenta vista
      response.status(201).send({
        message: 'Cuenta vista creada exitosamente.',
        data: nuevaCuentaVista,
      });
    } catch (error) {
      // Manejar errores, como cuando el usuario no existe
      if (error.status == 404) {
        return response.status(404).send({
          error: `Solicitud inválida. Usuario con ID ${createCuentasVistaDto.idUsuario} No Existe`,
        });
      }
      // Maneja otros errores
      return response.status(500).send({
        error: 'Ocurrió un error al crear la cuenta vista',
      });
    }
  }
  @ApiQuery({ name: 'habilitada', required: false, type: Boolean })
  @Get()
  findAll(
    @Query('habilitada', new ParseBoolPipe({ optional: true })) habilitada: boolean
  ) {
    let cuentasVista;
    let message;

    if (habilitada !== undefined) {
      cuentasVista = this.cuentasVistaService.findAll(habilitada);
      message = habilitada ? 'Cuentas vista habilitadas' : 'Cuentas vista deshabilitadas';
    } else {
      cuentasVista = this.cuentasVistaService.findAll();
      message = 'Todas las cuentas';
    }
    return {
      message: message,
      data: cuentasVista
    };
  }
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Cuenta vista encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Cuenta vista no encontrada' })
  findOne(@Param('id') id: string, @Res() response: Response) {
    const cuentaVista = this.cuentasVistaService.findOne(+id);
    if (cuentaVista) {
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Cuenta vista encontrada exitosamente',
        data: cuentaVista,
      });
    } else {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Cuenta vista no encontrada',
      });
    }
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Cambio Realizado Exitosamente' })
  @ApiResponse({ status: 404, description: 'Solicitud inválida. Cuenta vista No Existe' })
  update(@Param('id') id: string, @Body() updateCuentasVistaDto: UpdateCuentasVistaDto, @Res() response: Response) {
    const cuentaVista = this.cuentasVistaService.update(+id, updateCuentasVistaDto);
    if (cuentaVista) {
    return response.status(HttpStatus.OK).json({status
      : HttpStatus.OK, message: 'Cambio Realizado Exitosamente', data: cuentaVista });
  }else {
    return response.status(HttpStatus.NOT_FOUND).json({statusCode: HttpStatus.NOT_FOUND, message: 'Solicitud inválida. Cuenta vista No Existe' });
  }
}

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Cuenta vista eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Cuenta vista no encontrada' })
  remove(@Param('id') id: number, @Res() response: Response) {
    const cuentaVistaEliminada = this.cuentasVistaService.remove(id);
    if (cuentaVistaEliminada) {
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Cuenta vista eliminada exitosamente',
      });
    } else {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Cuenta vista no encontrada',
      });
    }
    
  }
}
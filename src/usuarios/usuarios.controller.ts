import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Response } from 'express';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TipoTransaccion } from 'src/transacciones/dto/tipo-transaccion.enum';
import { CreateTransaccioneDto } from 'src/transacciones/dto/create-transaccione.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Post(':id/transferir')
  @ApiResponse({ status: 200, description: 'Transferencia realizada' })
  @ApiResponse({ status: 404, description: 'Solicitud inválida. Usuario No Existe' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida, Usuario sin cuenta' })
  @ApiResponse({ status: 500, description: 'Sin Saldo Suficiente' })
  async transferir(
    @Param('id') usuarioId: string,
    @Body() createTransaccionDto: CreateTransaccioneDto,
    @Res() res: Response
  ) {
    const { cuentaVistaId, monto } = createTransaccionDto;
    try {
      await this.usuariosService.realizarTransferencia(+usuarioId, +cuentaVistaId, monto);
      return res.status(200).json({ message: 'Transferencia realizada con éxito' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof BadRequestException) {
        return res.status(400).json({ message: error.message });
      } else if (error instanceof InternalServerErrorException) {
        return res.status(500).json({ message: error.message });
      }
      throw error;
    }
  }

  @Post(':id/abonar')
  @ApiResponse({ status: 200, description: 'Abono realizado' })
  @ApiResponse({ status: 404, description: 'Solicitud inválida. Usuario No Existe' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida, Cuenta no Existe' })
  async abonar(
    @Param('id') usuarioId: string,
    @Body() createTransaccionDto: CreateTransaccioneDto,
    @Res() res: Response
  ) {
    const { monto } = createTransaccionDto;
    try {
      await this.usuariosService.realizarAbono(usuarioId, monto);
      return res.status(200).json({ message: 'Abono realizado con éxito' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof BadRequestException) {
        return res.status(400).json({ message: error.message });
      }
      throw error;
    }
  }

  @Post(':id/retirar')
  @ApiResponse({ status: 200, description: 'Retiro realizado' })
  @ApiResponse({ status: 404, description: 'Solicitud inválida. Usuario No Existe' })
  @ApiResponse({ status: 400, description: 'Solicitud invalida, Usuario sin cuenta' })
  @ApiResponse({ status: 500, description: 'Sin Saldo Suficiente' })
  async retirar(
    @Param('id') usuarioId: string,
    @Body() createTransaccionDto: CreateTransaccioneDto,
    @Res() res: Response
  ) {
    const { monto } = createTransaccionDto;
    try {
      await this.usuariosService.realizarRetiro(usuarioId, monto);
      return res.status(200).json({ message: 'Retiro realizado con éxito' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof BadRequestException) {
        return res.status(400).json({ message: error.message });
      } else if (error instanceof InternalServerErrorException) {
        return res.status(500).json({ message: error.message });
      }
      throw error;
    }
  }

  @ApiQuery({ name: 'nombre', required: false })
  @Get()
  findAll(@Query('nombre') nombre: string) {
    return this.usuariosService.findAll(nombre);
  }

  @Get(':id/transacciones')
  async obtenerTransacciones(
    @Param('id') usuarioId: string,
    @Res() res: Response,
    @Query('tipo') tipo?: TipoTransaccion
  ) {
    try {
      const transacciones = await this.usuariosService.obtenerTransacciones(usuarioId, tipo);
      return res.status(200).json(transacciones);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof BadRequestException) {
        return res.status(400).json({ message: error.message });
      }
      throw error;
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const usuario = await this.usuariosService.findOne(+id);
      if (usuario) {
        return response.status(200).json({ message: 'Usuario encontrado exitosamente.', usuario });
      } else {
        return response.status(404).json({ error: 'Solicitud inválida. Usuario No Existe' });
      }
    } catch (error) {
      return response.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Cambio Realizado Exitosamente' })
  @ApiResponse({ status: 404, description: 'Solicitud inválida. Usuario No Existe' })
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Res() response: Response
  ) {
    try {
      const usuario = await this.usuariosService.update(+id, updateUsuarioDto);
      if (usuario) {
        return response.status(200).json({ message: 'Usuario actualizado correctamente', usuario });
      } else {
        return response.status(404).json({ error: 'Solicitud inválida. Usuario No Existe' });
      }
    } catch (error) {
      return response.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuario Borrado' })
  @ApiResponse({ status: 404, description: 'Solicitud inválida. Usuario No Existe' })
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const usuarioEliminado = await this.usuariosService.remove(+id);
      if (usuarioEliminado) {
        return response.status(200).json({ message: 'Usuario Borrado' });
      } else {
        return response.status(404).json({ error: 'Solicitud inválida. Usuario No Existe' });
      }
    } catch (error) {
      return response.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

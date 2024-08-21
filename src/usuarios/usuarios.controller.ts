import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { response, Response } from 'express'; // Add this line to import the Response type
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @ApiQuery({ name: 'nombre', required: false })
  @Get()
  findAll(@Query('nombre') nombre: string) {
    return this.usuariosService.findAll(nombre);
  }


  @Get(':id')
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Solicitud inválida. Usuario No Existe' })
  findOne(@Param('id') id: string, @Res() response: Response) {
    const usuario = this.usuariosService.findOne(+id);
    if (usuario) {
      response.status(200).send({ message: 'Usuario encontrado exitosamente.', usuario: usuario });
    } else {
      response.status(404).send({ error: 'Solicitud inválida. Usuario No Existe' });
    }
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Cambio Realizado Exitosamente' })
  @ApiResponse({ status: 404, description: 'Solicitud inválida. Usuario No Existe' })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto, @Res() response: Response) {
    const usuario = this.usuariosService.update(+id, updateUsuarioDto);
    if (usuario) {
      response.status(200).send({ message: 'Usuario actualizado correctamente', usuario: usuario });
    } else {
      response.status(404).send({ error: 'Solicitud inválida. Usuario No Existe' });
    }

  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuario Borrado' })
  @ApiResponse({ status: 404, description: 'Solicitud inválida. Usuario No Existe' })
  remove(@Param('id') id: string, @Res() response: Response) {
    const usuarioEliminado = this.usuariosService.remove(+id);

    if (usuarioEliminado) {
      response.status(200).send({ message: 'Usuario Borrado' });
    } else {
      response.status(404).send({ error: 'Solicitud inválida. Usuario No Existe' });
    }
  }
}

import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('álbumes')
@ApiBearerAuth()
@Controller('albums')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AlbumsController {
  constructor(private svc: AlbumsService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Post()
  @Roles('DEVELOPER')
  @ApiResponse({ status: 403 })
  create(@Body() dto: CreateAlbumDto) { return this.svc.create(dto); }

  @Patch(':id')
  @Roles('DEVELOPER')
  @ApiResponse({ status: 403 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAlbumDto) { return this.svc.update(id, dto); }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(204)
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 403 })
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}

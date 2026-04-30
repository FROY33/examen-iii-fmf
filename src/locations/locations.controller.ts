import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('locations')
@ApiBearerAuth()
@Controller('locations')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LocationsController {
  constructor(private svc: LocationsService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Post()
  @Roles('DEVELOPER')
  @ApiResponse({ status: 403 })
  create(@Body() dto: CreateLocationDto) { return this.svc.create(dto); }

  @Patch(':id')
  @Roles('DEVELOPER')
  @ApiResponse({ status: 403 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLocationDto) { return this.svc.update(id, dto); }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiResponse({ status: 403 })
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}

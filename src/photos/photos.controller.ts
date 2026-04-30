import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('photos')
@ApiBearerAuth()
@Controller('photos')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PhotosController {
  constructor(private svc: PhotosService) {}

  @Get()
  findAll(@Request() req: any) { return this.svc.findAll(req.user); }

  @Post()
  @Roles('DEVELOPER')
  @ApiResponse({ status: 403 })
  create(@Body() dto: CreatePhotoDto) { return this.svc.create(dto); }

  @Patch(':id')
  @Roles('DEVELOPER')
  @ApiResponse({ status: 403 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePhotoDto) { return this.svc.update(id, dto); }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiResponse({ status: 403 })
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}

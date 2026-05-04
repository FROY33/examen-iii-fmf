import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('miembros')
@ApiBearerAuth()
@Controller('members')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MembersController {
  constructor(private svc: MembersService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Post()
  @Roles('DEVELOPER')
  @ApiResponse({ status: 403 })
  create(@Body() dto: CreateMemberDto) { return this.svc.create(dto); }

  @Patch(':id')
  @Roles('DEVELOPER')
  @ApiResponse({ status: 403 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMemberDto) { return this.svc.update(id, dto); }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(204)
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 403 })
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}

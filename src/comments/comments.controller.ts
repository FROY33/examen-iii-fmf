import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('comentarios')
@ApiBearerAuth()
@Controller('comments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CommentsController {
  constructor(private svc: CommentsService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Post()
  @Roles('DEVELOPER')
  @ApiResponse({ status: 403 })
  create(@Body() dto: CreateCommentDto) { return this.svc.create(dto); }

  @Patch(':id')
  @Roles('DEVELOPER')
  @ApiResponse({ status: 403 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommentDto) { return this.svc.update(id, dto); }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(204)
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 403 })
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}

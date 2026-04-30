import { IsString, MaxLength, IsOptional, IsEnum, IsInt, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Privacy } from '../photo.entity';

export class UpdatePhotoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  AlbumID?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  LocationID?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  MemberID?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  Title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  Description?: string;

  @ApiPropertyOptional({ enum: Privacy })
  @IsOptional()
  @IsEnum(Privacy)
  Privacy?: Privacy;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  ImagePath?: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}

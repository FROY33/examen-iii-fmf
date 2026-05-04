import { IsString, MaxLength, IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  Title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  Description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  View?: number;
}

import { IsString, MaxLength, IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  Title: string;

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

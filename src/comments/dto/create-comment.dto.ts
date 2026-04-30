import { IsString, MaxLength, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsInt()
  PhotoID: number;

  @ApiPropertyOptional()
  @IsOptional()
  PostDate?: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  Content: string;
}

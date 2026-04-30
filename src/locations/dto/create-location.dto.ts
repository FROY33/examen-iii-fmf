import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  Name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  Shortname: string;
}

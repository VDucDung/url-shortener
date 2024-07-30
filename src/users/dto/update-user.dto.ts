import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/common/enums/user.enum';

export class UpdateUserDto {
  @ApiProperty({ description: 'Username of the user', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: 'Password of the user', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'Email of the user', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Roles assigned to the user',
    example: ['admin', 'user'],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  roles?: Role[];
}

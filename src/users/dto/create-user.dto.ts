import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from 'src/common/enums/user.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class CreateUserDto {
  @ApiProperty({
    description: 'ID of the user',
    example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'vuducdung',
  })
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'atest@email.com',
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiHideProperty()
  @Column({ type: 'varchar', length: 255 })
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({
    description: 'Roles assigned to the user',
    example: ['admin', 'user'],
  })
  @Column('simple-array', { default: 'user' })
  roles: Role[];

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2023-07-30T18:00:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2024-07-30T18:00:00Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

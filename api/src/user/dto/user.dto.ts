import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class UserDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  hash: string;
}

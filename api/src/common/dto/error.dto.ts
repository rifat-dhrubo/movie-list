import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  statusCode: number;
  @ApiProperty({
    oneOf: [
      { type: 'string' },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  })
  message: string | string[];
  error: string;
}

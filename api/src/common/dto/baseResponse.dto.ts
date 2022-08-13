import { getSchemaPath } from '@nestjs/swagger';

export class BaseResponseDto {
  status: number;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const BaseSchema = (model: string | Function) => {
  const schema = {
    allOf: [
      {
        $ref: getSchemaPath(BaseResponseDto),
      },
    ],
    properties: {
      content: {
        $ref: getSchemaPath(model),
      },
    },
  };
  return schema;
};

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  me() {
    return 'hello me';
  }
}

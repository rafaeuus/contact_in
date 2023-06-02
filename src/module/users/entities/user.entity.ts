import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  readonly createdAt: string;
  name: string;
  email: string;
  phone: string;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date().toLocaleString();
  }
}

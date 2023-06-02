import { randomUUID } from 'crypto';

export class Contact {
  readonly id: string;
  readonly createdAt: string;
  name: string;
  email: string;
  phone: string;

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date().toLocaleString();
  }
}

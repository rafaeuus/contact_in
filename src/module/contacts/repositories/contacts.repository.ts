import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../entities/contact.entity';
import { UpdateContactDto } from '../dto/update-contact.dto';

export abstract class ContactsRepository {
  abstract create(data: CreateContactDto, userId: string): Promise<Contact>;
  abstract findOne(id: string, userId: string): Promise<Contact | undefined>;
  abstract findByEmail(
    email: string,
    userId: string,
  ): Promise<Contact | undefined>;
  abstract finbByPhone(
    phone: string,
    userId: string,
  ): Promise<Contact | undefined>;
  abstract findAll(userId: string): Promise<Contact[]>;
  abstract update(id: string, data: UpdateContactDto): Promise<Contact>;
  abstract delete(id: string): Promise<void>;
}

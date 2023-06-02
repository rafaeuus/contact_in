import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactsRepository) {}

  async create(createContactDto: CreateContactDto, userId: string) {
    const findContactEmail = createContactDto.email
      ? await this.contactRepository.findByEmail(createContactDto.email, userId)
      : false;

    const findContactPhone = createContactDto.phone
      ? await this.contactRepository.finbByPhone(createContactDto.phone, userId)
      : false;

    if (findContactEmail || findContactPhone) {
      throw new ConflictException('Contact already exist');
    }

    const contact = await this.contactRepository.create(
      createContactDto,
      userId,
    );
    return contact;
  }

  async findOne(id: string, userId: string) {
    const contact = await this.contactRepository.findOne(id, userId);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  async findAll(userId: string) {
    const contacts = await this.contactRepository.findAll(userId);
    return contacts;
  }

  async update(id: string, updateContactDto: UpdateContactDto, userId: string) {
    const contact = await this.contactRepository.findOne(id, userId);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    const updatedContact = await this.contactRepository.update(
      id,
      updateContactDto,
    );

    return updatedContact;
  }

  async remove(id: string, userId: string) {
    const contact = await this.contactRepository.findOne(id, userId);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    await this.contactRepository.delete(id);

    return;
  }
}

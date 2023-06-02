import { Injectable } from '@nestjs/common';
import { ContactsRepository } from '../contacts.repository';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateContactDto } from '../../dto/update-contact.dto';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDto, userId: string): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, {
      ...data,
    });

    const newContact = await this.prisma.contact.create({
      data: {
        ...contact,
        userId,
      },
    });

    return newContact;
  }

  async findOne(id: string, userId: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contact || contact.userId !== userId) {
      return null;
    }

    return contact;
  }

  async findByEmail(email: string, userId: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { email },
    });

    if (!contact || contact.userId !== userId) {
      return null;
    }

    return contact;
  }

  async finbByPhone(phone: string, userId: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { phone },
    });

    if (!contact || contact.userId !== userId) {
      return null;
    }

    return contact;
  }

  async findAll(userId: string): Promise<Contact[]> {
    const contact = await this.prisma.contact.findMany({
      where: { userId },
    });

    return contact;
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
    });

    return contact;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });
  }
}

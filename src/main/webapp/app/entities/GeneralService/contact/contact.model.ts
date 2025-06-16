import dayjs from 'dayjs/esm';
import { LanguageType } from 'app/entities/enumerations/language-type.model';

export interface IContact {
  id?: string;
  title?: string | null;
  address?: string | null;
  street?: string | null;
  code?: string | null;
  city?: string | null;
  state?: string | null;
  region?: string | null;
  country?: string | null;
  telephone?: string | null;
  email?: string;
  whatsapp?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  google?: string | null;
  youtube?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  language?: LanguageType;
  appointment?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  imageContentType?: string | null;
  image?: string | null;
  url?: string | null;
}

export class Contact implements IContact {
  constructor(
    public id?: string,
    public title?: string | null,
    public address?: string | null,
    public street?: string | null,
    public code?: string | null,
    public city?: string | null,
    public state?: string | null,
    public region?: string | null,
    public country?: string | null,
    public telephone?: string | null,
    public email?: string,
    public whatsapp?: string | null,
    public facebook?: string | null,
    public twitter?: string | null,
    public google?: string | null,
    public youtube?: string | null,
    public lastModified?: dayjs.Dayjs | null,
    public lastModifiedBy?: string | null,
    public language?: LanguageType,
    public appointment?: string | null,
    public latitude?: number | null,
    public longitude?: number | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public url?: string | null
  ) {}
}

export function getContactIdentifier(contact: IContact): string | undefined {
  return contact.id;
}

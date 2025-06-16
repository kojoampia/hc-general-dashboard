import dayjs from 'dayjs/esm';
import { LanguageType } from 'app/entities/enumerations/language-type.model';

export interface IAbout {
  id?: string;
  title?: string | null;
  content?: string | null;
  language?: LanguageType | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  createdBy?: string | null;
  modifiedBy?: string | null;
}

export class About implements IAbout {
  constructor(
    public id?: string,
    public title?: string | null,
    public content?: string | null,
    public language?: LanguageType | null,
    public createdDate?: dayjs.Dayjs | null,
    public modifiedDate?: dayjs.Dayjs | null,
    public createdBy?: string | null,
    public modifiedBy?: string | null
  ) {}
}

export function getAboutIdentifier(about: IAbout): string | undefined {
  return about.id;
}

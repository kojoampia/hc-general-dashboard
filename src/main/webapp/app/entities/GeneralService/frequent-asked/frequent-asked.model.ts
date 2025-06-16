import dayjs from 'dayjs/esm';

export interface IFrequentAsked {
  id?: string;
  question?: string | null;
  answer?: string | null;
  category?: string | null;
  createdDate?: dayjs.Dayjs | null;
  createdBy?: string | null;
  modifiedDate?: dayjs.Dayjs | null;
  modifiedBy?: string | null;
}

export class FrequentAsked implements IFrequentAsked {
  constructor(
    public id?: string,
    public question?: string | null,
    public answer?: string | null,
    public category?: string | null,
    public createdDate?: dayjs.Dayjs | null,
    public createdBy?: string | null,
    public modifiedDate?: dayjs.Dayjs | null,
    public modifiedBy?: string | null
  ) {}
}

export function getFrequentAskedIdentifier(frequentAsked: IFrequentAsked): string | undefined {
  return frequentAsked.id;
}

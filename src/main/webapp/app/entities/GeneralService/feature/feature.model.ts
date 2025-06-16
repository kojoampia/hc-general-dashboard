import dayjs from 'dayjs/esm';
import { FeatureItem } from '../feature-item/feature-item.model';

export interface IFeature {
  id?: string;
  name?: string | null;
  url?: string | null;
  items?: FeatureItem[];
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  createdBy?: string | null;
  modifiedBy?: string | null;
}

export class Feature implements IFeature {
  constructor(
    public id?: string,
    public name?: string | null,
    public items?: FeatureItem[],
    public url?: string | null,
    public createdDate?: dayjs.Dayjs | null,
    public modifiedDate?: dayjs.Dayjs | null,
    public createdBy?: string | null,
    public modifiedBy?: string | null
  ) {}
}

export function getFeatureIdentifier(feature: IFeature): string | undefined {
  return feature.id;
}

export interface IFeatureItem {
  id?: string;
  name?: string | null;
  url?: string | null;
  photoContentType?: string | null;
  photo?: string | null;
}

export class FeatureItem implements IFeatureItem {
  constructor(public id?: string, public name?: string | null, public url?: string | null, public photoContentType?: string | null, public photo?: string | null) {}
}

export function getFeatureItemIdentifier(featureItem: IFeatureItem): string | undefined {
  return featureItem.id;
}

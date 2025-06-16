export interface IFaqCategory {
  id?: string;
  label?: string;
  description?: string | null;
  matIcon?: string | null;
  color?: string | null;
  svgIcon?: string | null;
}

export class FaqCategory implements IFaqCategory {
  constructor(
    public id?: string,
    public label?: string,
    public description?: string | null,
    public matIcon?: string | null,
    public color?: string | null,
    public svgIcon?: string | null
  ) {}
}

export function getFaqCategoryIdentifier(faqCategory: IFaqCategory): string | undefined {
  return faqCategory.id;
}

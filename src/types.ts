export interface MenuItemData {
  id: string;
  name: string;
  price?: string | number;
  prices?: Record<string, string>;
  variantType?: 'H/F' | 'APS' | 'MULTI' | string;
  type?: 'veg' | 'non-veg';
  description?: string;
}

export interface MenuCategoryData {
  id: string;
  name: string;
  pdfSection?: string;
  isBar?: boolean;
  type?: 'veg' | 'non-veg';
  columns?: string[];
  items: MenuItemData[];
}

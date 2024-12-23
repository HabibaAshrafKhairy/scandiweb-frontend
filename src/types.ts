export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  in_stock: boolean;
  gallery: string[];
  category: Category;
  attributes: Attribute[];
  price: number;
}

export interface Attribute {
  id: number;
  name: string;
  items: AttributeItem[];
  type: "text" | "swatch";
}

export interface AttributeItem {
  id: number;
  value: string;
  displayValue: string | null;
  swatch: string | null;
}

export interface CartItem extends Product {
  selectedAttributesIds: number[];
  amount: number;
}

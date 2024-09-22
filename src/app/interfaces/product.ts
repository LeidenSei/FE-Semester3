export interface Product {
    id?: number|any;
    productName: string;
    price: number;
    salePrice: number;
    active: boolean;
    image: File | null;
    imageUrl?: string;
    description: string;
    categoryId: number;
    album: File[];
    attributes: Attribute[];
  }
  
  export interface Attribute {
    attributeId: number;
    optionId: number;
  }
  
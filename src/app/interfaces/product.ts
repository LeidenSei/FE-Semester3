export interface Product {
    id?: number;
    productName: string;
    price: number;
    salePrice: number;
    active: boolean;
    image: File | null;
    description: string;
    categoryId: number;
    album: File[];
    attributes: Attribute[];
  }
  
  export interface Attribute {
    attributeId: number;
    optionId: number;
  }
  
export interface OrderInput {
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
  };
  cartItems: {
    variantId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  receipt: File;
}

export interface OrderItemSingle {
  created_at:string;
  id:number;
  // status:'Pending'|'Paid'|'Shipped'|'Delivered'|'Cancelled';
  status:string;
  total_amount:number
}

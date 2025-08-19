export enum DeliveryType {
  ECONT = "econt",
  SPEEDY = "speedy"
}

export enum OrderStatus {
  PENDING = "изчакване",
  CONFIRMED = "потвърдена",
  COMPLETED = "завършена"
}

export interface Order {
  address: string;
  createdAt: number;
  delivery: DeliveryType;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  paintingIds: string[];
  postCode: string;
  status: OrderStatus;
  telephone: string;
  totalPrice: number;
  town: string;
}

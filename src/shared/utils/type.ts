import { TypeArea, TypePrice } from './variables';

export interface Pagination {
  page: number;
  size: number;
}
export interface File {
  originalname: string;
  filename: string;
  path: string;
  size: number;
}

export interface BaseType {
  ID: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
}

export interface Otp extends BaseType {
  phoneNumber: string;
  otp: string;
  expirationTimestamp: Date;
}

export interface LocationType {
  latitude: number;
  longitude: number;
}

export interface Motel extends BaseType {
  title: string;
  description: string;
  thumbnails: string[];
  area: number;
  unitArea: TypeArea;
  price: number;
  unitPrice: TypePrice;
  address: string;
  longitude: number;
  latitude: number;
  rating: number;
  isChecked: boolean;
  bedRoomQuantity: number;
  bathRoomQuantity: number;
  carGarageQuantity: number;
  closeTime: number;
  comments?: any[];
  owner?: any;
}

import * as dotenv from 'dotenv';
dotenv.config();

export const DATABASE = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

export const SERVER = {
  PORT: +process.env.SERVER_PORT,
};

export const JWT = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
};

export const STRIPE = {
  PUBLISH_KEY: process.env.STRIPE_PUBLISH_KEY as string,
  SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
};

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum PaymentMethod {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export enum TypePrice {
  VND = 'vnd',
  USD = 'usd',
}

export enum TypeArea {
  M2 = 'm2',
  M = 'm',
}

export enum ConversationType {
  GROUP = 'group',
  'TWO_USERS' = 'two_users',
  CLOUD = 'cloud',
}

export enum SocketEvent {
  New = 'new',
  Connected = 'connect',
  Disconnected = 'disconnect',
  Joined = 'joined',
  Message = 'message',
  AddFriend = 'add-friend',
  FriendAdded = 'friend-added',
  SearchFriend = 'search-friend',
  AudioCall = 'audio-call',
  VideoCall = 'video-call',
  Error = 'error',
}

export interface Emit {
  event: string;
  to?: string;
  data: any;
}

export enum MessageContentType {
  text = 'Văn bản',
  audio = 'Âm thanh',
  sticker = 'Sticker',
  image = 'Hình ảnh',
  file = 'File',
}
export interface MessageBodyData {
  // message: Message;
  to?: string;
  clientSocketId?: string;
}

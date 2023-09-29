import { UserEntity } from '../entities';

import * as dotenv from 'dotenv';
import { LocationType, Motel } from './type';
dotenv.config();

export const userDisplay = (user: UserEntity) => {
  if (!user) return user;
  delete user.password;
  delete user.token;
  return user;
};

export const userWithoutPasswordField = (user: UserEntity) => {
  if (!user) return user;
  delete user.password;
  delete user.token;
  return user;
};

export const sendSmsMessage = async (
  message: string,
  toPhoneNumber: string,
): Promise<boolean> => {
  if (toPhoneNumber.length !== 10) return false;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  const formatPhoneNumber = '+84'.concat(toPhoneNumber.substring(1));

  const result = await client.messages.create({
    body: message,
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
    to: formatPhoneNumber,
  });

  if (result.errorCode) return false;

  return result.status === 'accepted' || result.status === 'received';
};

// find location list by current location
// Function to calculate the distance between two points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Function to find locations within 2 kilometers of the current location
export function findLocationsByKilometers(
  currentLocation: LocationType,
  motelList: Motel[],
  kilometers: number,
) {
  return motelList.filter((motel) => {
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      motel.latitude,
      motel.longitude,
    );

    if (distance <= kilometers) {
      return motel;
    }
  });
}

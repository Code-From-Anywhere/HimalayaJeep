import { DefaultModelType } from "sensible-core";

export const publicJeepFields = [
  "id",
  "name",
  "phone",
  "seatsAvailable",
  "luggageUnitsAvailable",
  "createdAt",
  "updatedAt",
] as const;

export type PublicJeepFields = typeof publicJeepFields[number];

export type PublicJeepType = {
  [key in PublicJeepFields]: JeepType[key];
};

export interface JeepType extends DefaultModelType {
  name: string;
  email: string;
  /**
   * mobile phone number
   */
  phone: string;
  numberPlate: string;
  licenseId: string;
  citizenshipId: string;
  verified: boolean;
  /**
   * passenger seats avaiable inside the jeep
   */
  seatsAvailable: number;
  /**
   * m3
   */
  luggageUnitsAvailable: number;
  note: string;
}

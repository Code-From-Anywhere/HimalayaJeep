import { DefaultModelType } from "sensible-core";
import { LocationType } from "../Location/types";

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

const readonlyPublicJeepFields = [
  "id",
  "name",
  "phone",
  "seatsLeft",
  "luggageUnitsLeft",
  "createdAt",
  "updatedAt",
  "locations",
  "note",
] as const;

export const publicJeepFields = readonlyPublicJeepFields as Writeable<
  typeof readonlyPublicJeepFields
>;

export const readonlyMyJeepFields = [
  "id",
  "name",
  "phone",
  "seatsLeft",
  "luggageUnitsLeft",
  "createdAt",
  "updatedAt",
  "locations",
  "note",
  //also for me
  "email",
  "numberPlate",
  "lisenceId",
  "citizenshipId",
  "verified",
] as const;

export const myJeepFields = readonlyMyJeepFields as Writeable<
  typeof readonlyMyJeepFields
>;

export type PublicJeepFields = typeof publicJeepFields[number];

export const signupJeepFields = ["name", "phone", "email"] as const;
export type SignupJeepFields = typeof signupJeepFields[number];
export type MyJeepFields = typeof myJeepFields[number];

export type SignupJeepType = {
  [key in SignupJeepFields]: JeepType[key];
};

export type MyJeepType = {
  [key in MyJeepFields]: JeepType[key];
};

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
  /**
   * inputted by admin
   */
  numberPlate: string;
  /**
   * inputted by admin
   */
  lisenceId: string;
  /**
   * inputted by admin
   */
  citizenshipId: string;
  /**
   * inputted by admin
   */
  verified: boolean;
  /**
   * passenger seats left inside the jeep
   */
  seatsLeft: number;
  /**
   * m3 of luggage left
   */
  luggageUnitsLeft: number;
  note: string;

  locations: LocationType[];
  loginToken: string;
}

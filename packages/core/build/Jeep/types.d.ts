import { DefaultModelType } from "sensible-core";
import { LocationType } from "../Location/types";
export declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare const publicJeepFields: ["id", "name", "phone", "seatsLeft", "luggageUnitsLeft", "createdAt", "updatedAt", "locations", "note"];
export declare const readonlyMyJeepFields: readonly ["id", "name", "phone", "seatsLeft", "luggageUnitsLeft", "createdAt", "updatedAt", "locations", "note", "email", "numberPlate", "lisenceId", "citizenshipId", "verified"];
export declare const myJeepFields: ["id", "name", "phone", "seatsLeft", "luggageUnitsLeft", "createdAt", "updatedAt", "locations", "note", "email", "numberPlate", "lisenceId", "citizenshipId", "verified"];
export declare type PublicJeepFields = typeof publicJeepFields[number];
export declare const signupJeepFields: readonly ["name", "phone", "email"];
export declare type SignupJeepFields = typeof signupJeepFields[number];
export declare type MyJeepFields = typeof myJeepFields[number];
export declare type SignupJeepType = {
    [key in SignupJeepFields]: JeepType[key];
};
export declare type MyJeepType = {
    [key in MyJeepFields]: JeepType[key];
};
export declare type PublicJeepType = {
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
//# sourceMappingURL=types.d.ts.map
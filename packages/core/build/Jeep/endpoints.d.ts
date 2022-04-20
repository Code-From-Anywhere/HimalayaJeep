import { DefaultResponse, Endpoint } from "sensible-core";
import { MyJeepType, PublicJeepType, SignupJeepType } from "./types";
export interface JeepsEndpoint extends Endpoint {
    method: "GET";
    body: {};
    response: {
        jeeps: PublicJeepType[];
        success: boolean;
    };
}
export interface SignupEndpoint extends Endpoint {
    method: "POST";
    body: SignupJeepType;
    response: DefaultResponse & {
        loginToken: string;
    };
}
export interface AdminVerifyEndpoint extends Endpoint {
    method: "POST";
    body: {
        /**
         * password entered by admin in the app, hardcoded on the server
         */
        password: string;
        jeepId: number;
        lisenceId: string;
        citizenshipId: string;
        numberPlate: string;
    };
    response: DefaultResponse;
}
export interface MeEndpoint extends Endpoint {
    method: "GET";
    body: {
        loginToken: string;
    };
    response: {
        me?: MyJeepType;
        success: boolean;
    };
}
export interface UpdateJeepEndpoint extends Endpoint {
    method: "POST";
    body: {
        loginToken: string;
        email?: string;
        phone?: string;
        seatsLeft?: number;
        luggageUnitsLeft?: number;
        note?: string;
    };
    response: DefaultResponse;
}
export interface JeepEndpoints {
    signup: SignupEndpoint;
    me: MeEndpoint;
    updateJeep: UpdateJeepEndpoint;
    adminVerify: AdminVerifyEndpoint;
    jeeps: JeepsEndpoint;
}
//# sourceMappingURL=endpoints.d.ts.map
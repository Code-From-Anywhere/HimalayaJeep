import { DefaultResponse, Endpoint } from "sensible-core";

export interface InsertLocationEndpoint extends Endpoint {
  method: "POST";
  body: { latitude: number; longitude: number; loginToken: string };
  response: DefaultResponse;
}

export interface LocationEndpoints {
  insertLocation: InsertLocationEndpoint;
}

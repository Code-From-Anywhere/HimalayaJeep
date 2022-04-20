/**
 * Interpretable types are all types that metadata is going to built from (if that lib takes export * from syntax
 * We don't put generic types here as they are not supported.
 **/

import { JeepEndpoints } from "./Jeep/endpoints";
import { LocationEndpoints } from "./Location/endpoints";

export type AllEndpoints = JeepEndpoints & LocationEndpoints;

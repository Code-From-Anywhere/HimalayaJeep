import { Endpoint } from "sensible-core";
import { AllEndpoints } from "./InterpretableTypes";
import { Context } from "./server";
export declare type ServerEndpoint<TEndpoint extends Endpoint> = (ctx: Context & {
    body: TEndpoint["body"];
}) => Promise<TEndpoint["response"]>;
export declare type API = <TEndpoint extends keyof AllEndpoints>(endpoint: TEndpoint, method: AllEndpoints[TEndpoint]["method"], body?: AllEndpoints[TEndpoint]["body"], options?: {
    isExternal?: boolean;
}) => Promise<AllEndpoints[TEndpoint]["response"]>;
//# sourceMappingURL=ApiType.d.ts.map
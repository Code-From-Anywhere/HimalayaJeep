/**
 * Define constants here that need to be available on the backend and frontend.
 */

import { PublicConstantsType } from "sensible-core";

const domain = "https://getking.co";

export const PublicConstants: PublicConstantsType = {
  appName: "King",
  domain,
  email: "info@getking.co",
  links: [{ label: "Website", url: domain }],
};

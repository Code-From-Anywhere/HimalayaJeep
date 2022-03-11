/**
 * This file was auto-generated using the Sensible Boilerplate Creator (npx create-sensible-app).
 * You can edit it in what ever way you see fit.
 */

import { PublicConstants } from "core";

const env = process.env as { [key: string]: string };

const {
  SENDGRID_API_KEY,
  STRIPE_SECRET,
  STAGING_DB_DB,
  STAGING_DB_USER,
  STAGING_DB_PASSWORD,
  STAGING_DB_HOST,
  DB_DB,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  RUN_STAGING,
  DOMAIN,
  CLOUDFRONT_DOMAIN,
  NODE_ENV,
} = env;

const Constants = {
  ...PublicConstants,
  SENDGRID_API_KEY,
  STRIPE_SECRET,
  STAGING_DB_DB,
  STAGING_DB_USER,
  STAGING_DB_PASSWORD,
  STAGING_DB_HOST,
  DB_DB,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  RUN_STAGING,
  DOMAIN,
  CLOUDFRONT_DOMAIN,
  NODE_ENV,
};

// const hasAllKeys = Object.keys(Constants).map((key) => {
//   const value = env[key];
//   if (typeof value === "undefined" || value === "") {
//     console.log(`.env key ${key} isn't set`);
//     return false;
//   }
//   return true;
// });

export default Constants;

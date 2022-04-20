import server from "server";
import { makeEndpoint } from "../makeEndpoint";
import Jeep from "../Jeep/model";
import Location from "./model";

module.exports = [
  makeEndpoint("insertLocation", "POST", async (ctx) => {
    const { latitude, loginToken, longitude } = ctx.body;

    const jeep = await Jeep.findOne({ where: { loginToken } });

    if (!jeep) {
      return { response: "Couldn't find your jeep", success: false };
    }

    const nearbyVillage = "";

    const location = await Location.create({
      latitude,
      longitude,
      nearbyVillage,
    });

    const success = !!location;
    return { response: success ? "Inserted" : "Insertion failed", success };
  }),
];

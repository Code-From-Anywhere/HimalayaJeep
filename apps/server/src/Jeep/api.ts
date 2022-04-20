import Jeep from "./model";
import { WithDataValues } from "sensible-server";
import { isEmail, uuid } from "sensible-core";
import Constants from "../constants";
import { makeEndpoint } from "../makeEndpoint";
import Location from "../Location/model";
import { JeepType, myJeepFields } from "../core/Jeep/types";

module.exports = [
  /**
   * put 'verify' to true and update the lisence id etc for a jeep
   */
  makeEndpoint("adminVerify", "POST", async (ctx) => {
    const { citizenshipId, jeepId, lisenceId, numberPlate, password } =
      ctx.body;

    if (password !== Constants.ADMIN_PASSWORD) {
      return { success: false, response: "Incorrect password" };
    }

    const [updated] = await Jeep.update(
      { citizenshipId, lisenceId, numberPlate },
      { where: { id: jeepId } }
    );

    const success = updated === 1;

    return {
      success,
      response: success ? "Verified" : "Couldn't find that jeep",
    };
  }),

  makeEndpoint("jeeps", "GET", async (ctx) => {
    const jeeps = await Jeep.findAll({
      where: { verified: true },
      include: [{ model: Location }],
    });
    return {
      success: true,
      jeeps,
    };
  }),

  makeEndpoint("signup", "POST", async (ctx) => {
    const { email, name, phone } = ctx.body;

    if (!isEmail(email)) {
      return { success: false, response: "Invalid email address" };
    }

    const emailAlready = await Jeep.findOne({ where: { email } });

    if (emailAlready) {
      return { success: false, response: "Email already in use" };
    }

    const loginToken = uuid();

    const jeep = await Jeep.create({
      email,
      verified: false,
      phone,
      loginToken,
      name,
    });

    const success = !!jeep;

    return {
      success,
      response: success ? "Welcome" : "Not welcome",
      loginToken: success ? loginToken : undefined,
    };
  }),

  makeEndpoint("me", "GET", async (ctx) => {
    console.log("me endpoint being accessed");
    const { loginToken } = ctx.body;

    const me = (await Jeep.findOne({
      where: { loginToken },
      attributes: myJeepFields,
      include: [{ model: Location }],
    })) as WithDataValues<Jeep>;

    if (!me) {
      return { success: false, response: "Couldn't find me" };
    }

    return { success: true, me };
  }),

  makeEndpoint("updateJeep", "POST", async (ctx) => {
    const { loginToken, email, luggageUnitsLeft, note, phone, seatsLeft } =
      ctx.body;

    if (!loginToken) {
      return { response: "Unauthenticated", success: false };
    }

    const jeep = await Jeep.findOne({ where: { loginToken } });
    if (!jeep) {
      return { response: "Unauthenticated", success: false };
    }

    const body: Partial<JeepType> = {};

    if (email) body.email = email;
    if (luggageUnitsLeft) body.luggageUnitsLeft = luggageUnitsLeft;
    if (note) body.note = note;
    if (phone) body.phone = phone;
    if (seatsLeft) body.seatsLeft = seatsLeft;

    const [updated] = await Jeep.update(body, { where: { id: jeep.id } });

    const success = updated === 1;

    return {
      response: success ? "Successfully updated" : "Something went wrong",
      success,
    };
  }),
];

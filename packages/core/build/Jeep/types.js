"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupJeepFields = exports.myJeepFields = exports.readonlyMyJeepFields = exports.publicJeepFields = void 0;
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
];
exports.publicJeepFields = readonlyPublicJeepFields;
exports.readonlyMyJeepFields = [
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
];
exports.myJeepFields = exports.readonlyMyJeepFields;
exports.signupJeepFields = ["name", "phone", "email"];
//# sourceMappingURL=types.js.map
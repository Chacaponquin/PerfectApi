import League from "../../../db/schemas/League.js";
import { HttpQueryError } from "apollo-server-core";

export const findAvailibleLeagues = async() => {
    try {
        return await League.find({ availableForTeams: true });
    } catch (error) {
        throw new HttpQueryError(error.message);
    }
};
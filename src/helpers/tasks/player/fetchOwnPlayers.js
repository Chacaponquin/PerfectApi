import Player from "../../../db/schemas/Player.js";
import { HttpQueryError } from "apollo-server-core";

export const fetchOwnPlayers = async({ teamID }) => {
    try {
        const players = (await Player.find()).filter((player) => {
            return player.actualTeam == teamID;
        });

        return players;
    } catch (error) {
        throw new HttpQueryError(error.message);
    }
};
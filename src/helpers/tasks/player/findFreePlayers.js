import Player from "../../../db/schemas/Player.js";
import { HttpQueryError } from "apollo-server-core";

export const findFreePlayers = async() => {
    try {
        const players = (await Player.find().limit(40)).filter(
            (player) => player.freeToTransfer === true
        );

        return players;
    } catch (error) {
        throw new HttpQueryError(error);
    }
};
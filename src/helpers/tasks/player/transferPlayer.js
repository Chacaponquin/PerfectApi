import Transfer from "../../../db/schemas/Transfer.js";
import { ValidationError } from "apollo-server-core";
import Teams from "../../../db/schemas/Teams.js";
import Player from "../../../db/schemas/Player.js";

export const transferPlayer = async({
    teamFrom = null,
    teamTo,
    player,
    price = 0,
}) => {
    // TODO: PONER PARA HACER TRANSFERENCIAS CON DINERO
    const newTransfer = new Transfer({
        from: teamFrom,
        to: teamTo,
        player,
        price,
    });

    try {
        await newTransfer.save();

        if (teamFrom) {
            await Teams.findByIdAndUpdate(teamFrom, {
                $push: { transferRecord: newTransfer._id },
            });
        }

        await Player.findByIdAndUpdate(player, {
            $push: {
                teamsRecord: {
                    yearStart: new Date().getFullYear(),
                    team: teamTo,
                    transderID: newTransfer._id,
                },
            },
        });

        await Teams.findByIdAndUpdate(teamTo, {
            $push: { transferRecord: newTransfer._id },
        });

        return newTransfer._id;
    } catch (error) {
        throw new ValidationError(error.message);
    }
};
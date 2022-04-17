import Teams from "../../../db/schemas/Teams.js";
import { faker } from "@faker-js/faker";
import { ApolloError } from "apollo-server-core";
import League from "../../../db/schemas/League.js";

export const createTeam = async({ team }) => {
    const { name, league } = team;

    const dtPast = new Date();
    dtPast.setFullYear(dtPast.getFullYear() - 150);
    const dtNow = new Date();
    dtNow.setFullYear(dtNow.getFullYear() - 50);

    const newTeam = new Teams({
        // TODO: BUSCAR NOMBRES DE EQUIPOS REALES
        name,
        image: faker.image.sports(300, 300),
        fundationYear: faker.date.between(dtPast, dtNow),
        budget: faker.datatype.number({
            min: 300000,
            max: 500000000,
        }),
        league,
        // TODO: transferRecord
        // TODO: seasonRecord
    });

    try {
        await newTeam.save();

        await League.findByIdAndUpdate(league, { $push: { teams: newTeam._id } });

        return newTeam._id;
    } catch (error) {
        console.log(error);
        throw new ApolloError(error.message);
    }
};
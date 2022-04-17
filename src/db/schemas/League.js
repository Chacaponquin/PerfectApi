import mongoose from "mongoose";
import { countryList } from "../../helpers/allCountries.js";

const leagueSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50, unique: true },
    country: { type: String, required: true, maxlength: 50, enum: countryList },
    teams: {
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Team" }],
        default: [],
        maxlength: 20,
    },
});

leagueSchema.virtual("availibleForTeams").get(function() {
    return !this.teams.lenght === 20;
});

export default mongoose.model("League", leagueSchema);
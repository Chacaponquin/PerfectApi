import mongoose from "mongoose";

const seasonRecordSchema = new mongoose.Schema({
    yearStart: { type: Number, required: true },
    yearFinish: { type: Number, required: true },
    goals: { type: Number, min: 0, default: 0 },
    assists: { type: Number, default: 0, min: 0 },
    players: {
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Player" }],
        maxlength: 25,
        minlength: 15,
    },
});

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 30, unique: true },

    image: { type: String, required: true },
    fundationYear: { type: Date, required: true, max: Date.now() },
    budget: {
        type: mongoose.SchemaTypes.Number,
        default: 30000,
        min: 300000,
        max: 500000000,
    },
    league: {
        type: mongoose.SchemaTypes.ObjectId,
        default: null,
        ref: "League",
    },
    color: {
        type: String,
        required: true,
        maxlength: 7,
        default: "#000000",
    },
    transferRecord: {
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Transfer" }],
        default: [],
    },
    seasonRecord: { type: [seasonRecordSchema], default: [] },
});

export default mongoose.model("Team", teamSchema);
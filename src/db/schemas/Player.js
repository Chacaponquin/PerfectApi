import mongoose from "mongoose";

const priceRecordSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    price: {
        type: [{
            type: mongoose.SchemaTypes.Number,
            required: true,
            min: 30000,
            max: 300000000,
        }, ],
        required: true,
        maxlength: 12,
    },
});

const teamRecordSchema = new mongoose.Schema({
    yearStart: { type: Number, required: true },
    yearFinish: { type: Number, default: null },
    team: { type: mongoose.SchemaTypes.ObjectId, ref: "Team" },
    transferID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Transfer",
    },
});

const dorsalRecordSchema = new mongoose.Schema({
    yearStart: { type: Number, required: true },
    yearFinish: { type: Number, default: null },
    dorsal: { type: Number, required: true, min: 1, max: 99 },
});

const mediaRecordSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    media: {
        type: [{ type: Number, required: true, min: 50, max: 99 }],
        maxlength: 12,
        required: true,
    },
});

const seasonRecordSchema = new mongoose.Schema({
    yearStart: { type: Number, required: true },
    yearFinish: { type: Number, required: true },
    minutes: { type: Number, min: 0, default: 0 },
    assists: { type: Number, min: 0, default: 0 },
    matchPlayed: { type: Number, min: 0, default: 0 },
    goals: { type: Number, default: 0, min: 0 },
});

const playerSchema = new mongoose.Schema({
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    alias: { type: String, default: null },
    birthDate: { type: Date, required: true },
    image: { type: String, required: true },
    mediaRecord: {
        type: [mediaRecordSchema],
        default: [],
    },
    gender: { type: String, required: true, enum: ["MALE", "FEMALE"] },
    position: {
        type: String,
        required: true,
        enum: ["POR", "DEF", "CAD", "MCD", "MED", "EXT", "SD", "DC"],
    },
    country: { type: String, required: true, maxlength: 50 },
    salary: { type: Number, min: 0 },

    teamsRecord: {
        type: [teamRecordSchema],
        default: [],
    },

    dorsalRecord: {
        type: [dorsalRecordSchema],
        default: [],
    },

    playerPrice: { type: [priceRecordSchema], default: [] },

    socialMedia: { type: mongoose.SchemaTypes.Mixed, default: {} },

    nationStats: { default: {} },

    seasonRecords: { type: [seasonRecordSchema], default: [] },
}, { timestamps: { createdAt: "create_at" } });

// VIRTUAL CON EL NOMBRE COMPLETO
playerSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// VIRTUAL DE CANTIDAD DE TEMPORADAS JUGADAS
playerSchema.virtual("totalSeasonPlayed").get(function() {
    return new Date().getFullYear() - 16 - this.birthDate.getFullYear();
});

// VIRTUAL CON LA EDAD DEL JUGADOR
playerSchema.virtual("age").get(function() {
    return new Date().getFullYear() - this.birthDate.getFullYear();
});

// VIRTUAL PARA SABER SI ESTA LIBRE PARA JUGAR POR UN EQUIPO
playerSchema.virtual("freeToTransfer").get(function() {
    const finalPos = this.teamsRecord.length - 1;

    return this.teamsRecord.length === 0 || this.teamsRecord[finalPos].yearFinish;
});

// VIRTUAL PARA VER EL EQUIPO ACTUAL DEL JUGADOR
playerSchema.virtual("actualTeam").get(function() {
    const finalPos = this.teamsRecord.length - 1;

    if (this.teamsRecord.length === 0) return null;
    else {
        return this.teamsRecord[finalPos].team;
    }
});

export default mongoose.model("Player", playerSchema);
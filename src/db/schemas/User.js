import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: {
        type: String,
        required: true,
    },
    email: { type: String, required: true },
    image: { type: String, default: null },
    role: {
        type: String,
        required: true,
        enum: ["MANAGER", "CURRENT_USER", "SUPER_USER"],
    },
}, { timestamps: { createdAt: "create_at" } });

export default mongoose.model("User", userSchema);
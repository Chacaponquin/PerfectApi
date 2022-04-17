import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then((doc) => {
        console.log("Db connected");
    })
    .catch((error) =>
        console.log("No se pudo conectar a la base de datos,", error)
    );

export default mongoose;
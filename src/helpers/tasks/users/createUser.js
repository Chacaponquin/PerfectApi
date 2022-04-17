import User from "../../../db/schemas/User.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-core";

export const createUser = async({ user }) => {
    const { username, password, email } = user;

    if (!/^[a-z]*[-._]?[a-z]*$/.test(password))
        throw new AuthenticationError("Mal patron para la contraseña");

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashPassword,
        email,
        image: faker.image.avatar(),
    });

    try {
        const doc = await newUser.save();
        const token = jwt.sign({ id: newUser.id, username: newUser.username },
            process.env.SECRET_WORD
        );

        return {...doc._doc, token };
    } catch (error) {
        console.log(error);
        throw new AuthenticationError("Hubo un error");
    }
};
import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import jwt from "jsonwebtoken";
import { typeDefs, resolvers } from "./src/graphql/index.js";

import "./src/db/mongo.js";

async function startApolloServer(typeDefs, resolvers) {
    dotenv.config();

    const app = express();
    app.use(express.json());
    app.use(cors());

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground({}),
        ],
        context: ({ req }) => {
            const auth = req ? req.headers.authorization : null;

            if (auth && auth.toLowerCase().startsWith("bearer ")) {
                const token = auth.substring(7);

                const user = jwt.verify(token, process.env.SECRET_WORD);
                return { currentUser: user };
            }
        },
    });

    await server.start();

    server.applyMiddleware({ app });

    const port = process.env.PORT || 5000;
    await new Promise((resolve) => httpServer.listen({ port: port }, resolve));

    console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
}

startApolloServer(typeDefs, resolvers);
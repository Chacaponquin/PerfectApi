import { gql } from "apollo-server-core";
import { createPlayer } from "../../helpers/tasks/player/createPlayer.js";
import { fetchOwnPlayers } from "../../helpers/tasks/player/fetchOwnPlayers.js";
import { findFreePlayers } from "../../helpers/tasks/player/findFreePlayers.js";
import { transferPlayer } from "../../helpers/tasks/player/transferPlayer.js";

export const playerSchema = gql `
  enum Genders {
    MALE
    FEMALE
  }

  input TransferPlayerInput {
    teamFrom: String
    teamTo: String!
    player: String!
    price: Int
  }

  input FetchOwnPlayersInput {
    teamID: ID!
  }

  type Player {
    _id: ID
    image: String
    fullName: String
  }

  type Query {
    findFreePlayers: [Player]!
    fetchOwnPlayers(team: FetchOwnPlayersInput!): [Player]!
  }

  type Mutation {
    createPlayer: Player!
    transferPlayer(data: TransferPlayerInput!): ID!
  }
`;

export const playerResolver = {
    Query: {
        findFreePlayers: () => findFreePlayers(),
        fetchOwnPlayers: (root, args) => fetchOwnPlayers(args.team),
    },
    Mutation: {
        createPlayer: () => createPlayer(),
        transferPlayer: (root, args) => transferPlayer(args.data),
    },
};
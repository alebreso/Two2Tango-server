import { createConnection } from "typeorm";
import User from "./entities/User";
import Profile from "./entities/Profile";
import Preference from "./entities/Preference";
import Message from "./entities/Message";
import Chat from './entities/Chat'

export default () =>
  createConnection({
    type: "postgres",
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:secret@localhost:5432/real-world-project",
    entities: [User, Profile, Preference, Message, Chat],
    synchronize: true, // careful with this in production!
    logging: true
  }).then(_ => console.log("Connected to Postgres with TypeORM"));

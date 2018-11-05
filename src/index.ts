import "reflect-metadata";
import { Action, BadRequestError, useKoaServer } from "routing-controllers";
import { connectDatabase } from "./db";
// import {UserController, LoginController} from './controllers'
import { verify } from "./jwt";
import User from "./entities/User";
import * as Koa from "koa";
import { Server } from "http";
import { secret } from "./jwt";

const app = new Koa();
const server = new Server(app.callback());

const port = process.env.PORT || 4000;

useKoaServer(app, {
  cors: true,
  //   controllers: [
  //     UserController,
  //     LoginController
  //   ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      try {
        return !!(token && verify(token));
      } catch (e) {
        throw new BadRequestError(e);
      }
    }

    return false;
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      if (token) {
        const { id } = verify(token);
        return User.findOne(id);
      }
    }
    return undefined;
  }
});

connectDatabase()
  .then(_ => {
    server.listen(port);
    console.log(`Listening on port ${port}`);
  })
  .catch(err => console.error(err));
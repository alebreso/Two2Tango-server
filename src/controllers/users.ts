import {
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  JsonController
} from "routing-controllers";
import User from "../entities/User";

@JsonController()
export default class UserController {
  @Get("/users")
  async getAllUsers() {
    const users = await User.find();
    return { users };
  }

  @Get("/users/:id")
  async getUser(@Param("id") id: number) {
    const user = await User.findOne(id);
    return user;
  }

  @Post("/signup")
  @HttpCode(201)
  async addUser(@Body() data: User) {
    const { password, ...rest } = data;

    const entity = User.create(rest);
    await entity.setPassword(password);

    const user = await entity.save();
    return user;
  }
}

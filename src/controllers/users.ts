import {
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  JsonController,
  Put,
  BadRequestError,
  CurrentUser,
  Delete
} from "routing-controllers";
import User from "../entities/User";

@JsonController()
export default class UserController {
  @Get("/users")
  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  @Get("/users/:id")
  async getUser(@Param("id") id: number) {
    const user = await User.findOne(id);
    return user;
  }

  @Post("/users")
  @HttpCode(201)
  async addUser(@Body() data: User) {
    const { password, ...rest } = data;

    const entity = User.create(rest);
    await entity.setPassword(password);

    const user = await entity.save();
    return user;
  }

  @Put("/users")
  async updateUser(@Body() update: Partial<User>, @CurrentUser() user: User) {
    const entity = await User.findOne({ where: { id: user.id } });

    if (update.password) {
      await entity.setPassword(update.password);
      delete update.password;
    }

    return await User.merge(entity, update).save();
  }

  @Delete("/users")
  async deleteUser(@CurrentUser() user: User) {
    const entity = await User.findOne({ where: { id: user.id } });

    return await User.remove(entity);
  }
}

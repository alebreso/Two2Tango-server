import {
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  JsonController,
  Put,
  BadRequestError,
  CurrentUser
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

  @Put("/:id/change-email")
  @HttpCode(201)
  async updateEmail(
    @Param("id") id: number,
    @Body() update: Partial<User>,
    @CurrentUser() user: User
  ) {
    if (user.id !== id)
      throw new BadRequestError("You are not authorized to change this email");

    const { email } = update;
    const entity = await User.findOne(id);
    if (!entity) throw new BadRequestError("User does not exist");

    entity.email = email;

    return entity.save();
  }

  @Put("/:id/change-password")
  @HttpCode(201)
  async updatePassword(
    @Param("id") id: number,
    @Body() update: Partial<User>,
    @CurrentUser() user: User
  ) {
    if (user.id !== id)
      throw new BadRequestError(
        "You are not authorized to change this password"
      );

    const { password } = update;
    const entity = await User.findOne(id);
    if (!entity) throw new BadRequestError("User does not exist");

    await entity.setPassword(password);

    return entity.save();
  }
}

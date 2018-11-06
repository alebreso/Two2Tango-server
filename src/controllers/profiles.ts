import {
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  JsonController,
  BadRequestError
} from "routing-controllers";
import User from "../entities/User";
import Profile from "../entities/Profile";
import { getConnection } from "typeorm";

@JsonController()
export default class ProfileController {
  @Get("/profiles")
  async getAllProfiles() {
    const user = await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .leftJoin("user.profile", "profile")
      .where("user.id = :id", { id: 1 })
      .getOne();

    return user;
    // const profiles = await Profile.find();
    // return { profiles };
  }

  @Get("/profiles/:id")
  async getUser(@Param("id") id: number) {
    const profile = await Profile.findOne(id);
    return profile;
  }

  @Post("/signup/:id/profile")
  @HttpCode(201)
  async addProfile(@Param("id") id: number, @Body() data: Profile) {
    const user = await User.findOne(id);
    if (!user) throw new BadRequestError("User not found");

    const profile = await Profile.create({
      ...data,
      user
    }).save();

    return profile;
  }
}

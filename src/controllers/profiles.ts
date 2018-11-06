import {
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  JsonController,
  BadRequestError,
  Put,
  CurrentUser
} from "routing-controllers";
import User from "../entities/User";
import Profile from "../entities/Profile";

@JsonController()
export default class ProfileController {
  @Get("/profiles")
  async getAllProfiles() {
    const profiles = await Profile.find();
    return profiles;
  }

  @Get("/profiles/:id")
  async getProfile(@Param("id") id: number) {
    const profile = await Profile.findOne(id);
    return profile;
  }

  @Post("/profiles")
  @HttpCode(201)
  async addProfile(@CurrentUser() user: User, @Body() data: Profile) {
    const profile = await Profile.create({
      ...data,
      user
    }).save();

    return profile;
  }

  @Put("/profiles")
  async updateProfile(@CurrentUser() user: User, @Body() update) {
    const profile = await Profile.findOne({ where: { userId: user.id } });
    if (!profile) throw new BadRequestError("Profile does not exist");

    return await Profile.merge(profile, update).save();
  }
}

import {
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  JsonController,
  BadRequestError,
  Put
} from "routing-controllers";
import User from "../entities/User";
import Profile from "../entities/Profile";
import { getConnection } from "typeorm";

@JsonController()
export default class ProfileController {
  @Get("/profiles")
  async getAllProfiles() {
    const profiles = await Profile.find();
    return { profiles };
  }

  @Get("/profiles/:id")
  async getProfile(@Param("id") id: number) {
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

  @Put("/profiles/:id/edit-profile")
  async updateProfile(
    @Param("id") id: number,
    @Body() update: Partial<Profile>
  ) {
    const profile = await Profile.findOne(id);
    if (!profile) throw new BadRequestError("Profile does not exist");

    const updatedProfile = await Profile.merge(profile, update).save();
    return updatedProfile;
  }
}

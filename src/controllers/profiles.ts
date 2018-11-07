import {
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  JsonController,
  BadRequestError,
  Put,
  CurrentUser,
  Authorized
} from "routing-controllers";
import User from "../entities/User";
import Profile from "../entities/Profile";
import { getConnection, Brackets } from "typeorm";
import Preference from "../entities/Preference";

@JsonController()
export default class ProfileController {
  @Get("/profiles")
  async getAllProfiles(@CurrentUser() user: User) {
    console.log(user);
    const preference = await Preference.findOne({ where: { userId: user.id } });
    console.log(preference.role);

    const profiles = await getConnection()
      .createQueryBuilder()
      .select("profile")
      .from(Profile, "profile")
      .where(
        new Brackets(qb => {
          qb.where("profile.role = :role1", {
            role1: preference.role[0]
          }).orWhere("profile.role = :role2", { role2: preference.role[1] });
        })
      )
      // .andWhere("profile.city = :city", { city: preference.city })
      // .andWhere(
      //   new Brackets(qb => {
      //     qb.where("profile.level = :level", {
      //       level: preference.level[0]
      //     }).orWhere("profile.level = :level", { level: preference.level[1] });
      //   })
      // )
      .getMany();

    console.log("All the profiles matching: ", profiles);

    // const profiles = await Profile.find();
    // return profiles;
  }

  @Get("/profiles/:id")
  async getSingleProfile(@Param("id") id: number) {
    const profile = await Profile.findOne(id);
    return profile;
  }

  @Authorized()
  @Post("/profiles")
  @HttpCode(201)
  async addProfile(@CurrentUser() user: User, @Body() data: Profile) {
    const profile = await Profile.create({
      ...data,
      userId: user.id
    }).save();

    return profile;
  }

  @Authorized()
  @Put("/profiles")
  async updateProfile(@CurrentUser() user: User, @Body() update) {
    const profile = await Profile.findOne({ where: { userId: user.id } });
    if (!profile) throw new BadRequestError("Profile does not exist");

    return await Profile.merge(profile, update).save();
  }
}

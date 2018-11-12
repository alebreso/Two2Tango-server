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
  // @Authorized()
  @Get("/profiles")
  async getAllProfiles(@CurrentUser() user: User) {
    if (!user) throw new BadRequestError("Login to see your results");
    console.log(user);
    const preference = await Preference.findOne({ where: { userId: user.id } });
    console.log("Preference: -------", preference);
    const profiles = await getConnection()
      .createQueryBuilder()
      .select("profile")
      .from(Profile, "profile")
      .where("profile.role = :role", { role: preference.role })
      .andWhere(
        new Brackets(qb => {
          qb.where("profile.level = :level1", {
            level1: preference.level[0]
          })
            .orWhere("profile.level = :level2", { level2: preference.level[1] })
            .orWhere("profile.level = :level3", { level3: preference.level[2] })
            .orWhere("profile.level = :level4", {
              level4: preference.level[3]
            });
        })
      )
      .andWhere(
        new Brackets(qb => {
          qb.where("profile.city = :city1", {
            city1: preference.city[0]
          })
            .orWhere("profile.city = :city2", { city2: preference.city[1] })
            .orWhere("profile.city = :city3", { city3: preference.city[2] })
            .orWhere("profile.city = :city4", { city4: preference.city[3] });
        })
      )
      .andWhere("profile.age between :age1 AND :age2", {
        age1: preference.age[0],
        age2: preference.age[1]
      })
      .andWhere("profile.height between :height1 AND :height2", {
        height1: preference.height[0],
        height2: preference.height[1]
      })
      .andWhere("profile.gender = :gender", { gender: preference.gender })
      .getMany();

    console.log("All the profiles matching: ---------- ", profiles);

    return profiles;
  }

  @Get("/profiles/:id")
  async getSingleProfile(@Param("id") id: number) {
    const profile = await Profile.findOne(id);
    return profile;
  }

  @Get("/latest-profiles")
  async getLatestProfiles() {
    const profiles = await Profile.find({
      select: ["firstName", "level", "photoUrl"],
      order: { createdAt: "DESC" },
      take: 5
    });
    return profiles;
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
    console.log(update);
    const profile = await Profile.findOne({ where: { userId: user.id } });
    if (!profile) throw new BadRequestError("Profile does not exist");

    return await Profile.merge(profile, update).save();
  }
}

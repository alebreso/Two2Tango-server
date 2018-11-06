import {
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  JsonController,
  BadRequestError,
  Put,
  Authorized
} from "routing-controllers";
import User from "../entities/User";
import Profile from "../entities/Profile";
import Preference from "../entities/Preference";
@JsonController()
export default class PreferenceController {
  @Get("/preferences")
  async getAllPreferences() {
    const preferences = await Preference.find();
    return { preferences };
  }
  @Get("/preferences/:id([0-9]+)")
  async getPreference(@Param("id") id: number) {
    const preferences = await Preference.findOne(id);
    return preferences;
  }
  @Get("profile/:id([0-9]+)/preferences")
  async getPreferenceOfProfile(@Param("id") id: number) {
    const profile = await Profile.findOne(id);
    const preference = await Preference.findOne({
      where: { id: profile.user }
    });
    return preference;
  }

  @Post("/signup/:id([0-9]+)/preferences")
  @HttpCode(201)
  async addPreference(@Param("id") id: number, @Body() data: Preference) {
    const user = await User.findOne(id);
    if (!user) throw new BadRequestError("User not found");
    const preference = await Preference.create({
      ...data,
      user
    }).save();
    return preference;
  }
  //@Authorized()
  @Put("/edit/:id([0-9]+)/preferences")
  @HttpCode(201)
  async updatePreference(
    @Param("id") id: number,
    @Body() update: Partial<Preference>
  ) {
    const preference = await Preference.findOne(id);
    if (!preference) throw new BadRequestError("preference not found");
    return await Preference.merge(preference, update).save();
  }
}

import {
  Get,
  Post,
  HttpCode,
  Body,
  JsonController,
  BadRequestError,
  Put,
  CurrentUser,
  Authorized
} from "routing-controllers";
import User from "../entities/User";
import Preference from "../entities/Preference";

@JsonController()
export default class PreferenceController {
  @Authorized()
  @Get("/preferences")
  async getAllPreferences(@CurrentUser() user: User) {
    const preference = await Preference.findOne({ where: { userId: user.id } });
    return preference;
  }

  @Authorized()
  @Post("/preferences")
  @HttpCode(201)
  async addPreference(@CurrentUser() user: User, @Body() data: Preference) {
    const preference = await Preference.create({
      ...data,
      userId: user.id
    }).save();

    return preference;
  }

  @Authorized()
  @Put("/preferences")
  async updatePreferences(
    @CurrentUser() user: User,
    @Body() update: Partial<Preference>
  ) {
    const preference = await Preference.findOne({ where: { userId: user.id } });
    if (!preference) throw new BadRequestError("Preference does not exist");

    return await Preference.merge(preference, update).save();
  }
}

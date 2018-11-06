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
import Eventdate from "../entities/Eventdate";
import Event from "../entities/Event";
import {
  createQueryBuilder,
  QueryBuilder,
  getConnection,
  getRepository
} from "typeorm";
@JsonController()
export default class EventdateController {
  @Get("/eventsdates")
  async getAllEventdate() {
    const eventsDates = await Eventdate.find();
    return { eventsDates };
  }
  @Get("/event/:id/dates")
  async getDates(@Param("id") id: number) {
    const eventRepository = getRepository(Event);
    const dates = await eventRepository.find({
      where: { id: id },
      relations: ["dates"]
    });
    return dates;
  }
  @Post("/events/:id/dates")
  @HttpCode(201)
  async addEventDates(@Param("id") id: number, @Body() data: Eventdate) {
    const event = await Event.findOne(id);
    if (!event) throw new BadRequestError("Event not found");
    const dates = await Eventdate.create({
      ...data
    }).save();
    return dates;
  }
  //@Authorized()
  // @Put("/edit/:id/preferences")
  // @HttpCode(201)
  // async updatePreference(@Param("id")id :number, @Body()update :Partial<Preference>){
  //   const preference = await Preference.findOne(id)
  //   if(!preference) throw new BadRequestError('preference not found')
  //   return await Preference.merge(preference,update).save()
  // }
}

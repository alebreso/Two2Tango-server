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
  Delete
} from "routing-controllers";
import User from "../entities/User";
import Event from "../entities/Event";
import Eventdate from "../entities/Eventdate";

@JsonController()
export default class EventdateController {
  @Get("/dates")
  async getAllDates() {
    const eventDates = await Eventdate.find();
    return eventDates;
  }

  @Get("/events/:id/dates")
  async getProfile(@Param("id") id: number) {
    const eventWithDates = await Event.findOne(id, {
      relations: ["eventdates"]
    });
    return eventWithDates;
  }

  @Post("/events/:id/dates")
  @HttpCode(201)
  async addDates(
    @CurrentUser() user: User,
    @Param("id") id: number,
    @Body() data: Eventdate
  ) {
    const event = await Event.findOne(id);
    if (!event) throw new BadRequestError("Event does not exist");

    return await Eventdate.create({
      ...data,
      eventId: event.id
    }).save();
  }

  // @Put("/events/:id/dates")
  // async updateEvent(
  //   @CurrentUser() user: User,
  //   @Param("id") id: number,
  //   @Body() update: Partial<Event>
  // ) {
  //   const event = await Event.findOne(id);
  //   if (!event) throw new BadRequestError("Event does not exist");
  //   if (user.id !== event.userId)
  //     throw new BadRequestError("You can not edit this event");

  //   return await Event.merge(event, update).save();
  // }

  // @Delete("/events/:id")
  // async deleteEvent(
  //   @CurrentUser() user: User,
  //   @Param("id") id: number,
  //   @Body() update: Partial<Event>
  // ) {
  //   const event = await Event.findOne(id);
  //   if (!event) throw new BadRequestError("Event does not exist");
  //   if (user.id !== event.userId)
  //     throw new BadRequestError("You can not edit this event");

  //   return await Event.remove(event);
  // }
}

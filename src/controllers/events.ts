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

@JsonController()
export default class EventController {
  @Get("/events")
  async getAllEvents() {
    const events = await Event.find();
    return events;
  }

  @Get("/events/:id")
  async getProfile(@Param("id") id: number) {
    const event = await Event.findOne(id);
    return event;
  }

  @Post("/events")
  @HttpCode(201)
  async addEvent(@CurrentUser() user: User, @Body() data: Event) {
    const event = await Event.create({
      ...data,
      user
    }).save();

    return event;
  }

  @Put("/events/:id")
  async updateEvent(
    @CurrentUser() user: User,
    @Param("id") id: number,
    @Body() update: Partial<Event>
  ) {
    const event = await Event.findOne(id);
    if (!event) throw new BadRequestError("Event does not exist");
    if (user.id !== event.userId)
      throw new BadRequestError("You can not edit this event");

    return await Event.merge(event, update).save();
  }

  @Delete("/events/:id")
  async deleteEvent(
    @CurrentUser() user: User,
    @Param("id") id: number,
    @Body() update: Partial<Event>
  ) {
    const event = await Event.findOne(id);
    if (!event) throw new BadRequestError("Event does not exist");
    if (user.id !== event.userId)
      throw new BadRequestError("You can not edit this event");

    return await Event.remove(event);
  }
}

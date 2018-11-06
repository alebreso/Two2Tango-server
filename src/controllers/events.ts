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
    return { events };
  }

  @Get("/events/:id")
  async getProfile(@Param("id") id: number) {
    const event = await Event.findOne(id);
    return event;
  }

  // @Post("/events")
  // @HttpCode(201)
  // async addEvent(@CurrentUser() creator: User, @Body() data: Event) {
  //   const event = await Event.create({
  //     ...data,
  //     creator
  //   }).save();

  //   return event;
  // }

  // NEEDS TO HAVE A CHECK IF USER IS AUTHORIZED TO DELETE EVENT
  @Put("/events/:id")
  async updateEvent(
    @CurrentUser() user: User,
    @Param("id") id: number,
    @Body() update: Partial<Event>
  ) {
    const event = await Event.findOne(id);
    console.log("-------------------------------");
    console.log("User id: ", user.id);
    //console.log("event creator: ", event.creator);
    if (!event) throw new BadRequestError("Event does not exist");
    // if(user.id !== event.creator) throw new BadRequestError

    const updatedEvent = await Event.merge(event, update).save();
    return updatedEvent;
  }

  // NEEDS TO HAVE A CHECK IF USER IS AUTHORIZED TO DELETE EVENT
  @Delete("/events/:id")
  async deleteEvent(
    @CurrentUser() user: User,
    @Param("id") id: number,
    @Body() update: Partial<Event>
  ) {
    const event = await Event.findOne(id);
    if (!event) throw new BadRequestError("Event does not exist");

    return await Event.remove(event);
  }
}

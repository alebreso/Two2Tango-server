import {
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  JsonController,
  Put,
  BadRequestError,
  CurrentUser,
  Delete,
  Authorized
} from "routing-controllers";
import User from "../entities/User";
import Message from "../entities/Message";

@JsonController()
export default class MessageController {
  @Get("/messages")
  async getAllMessages(@CurrentUser() user: User) {
    const messages = await Message.find({ where: { userId: user.id } });
    return messages;
  }

  @Post("/messages")
  @HttpCode(201)
  async addUser(@Body() data: Message) {
    const message = await Message.create({
      content: data.content,
      userId: data.userId
    }).save();

    return message;
  }
}

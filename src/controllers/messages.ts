import {
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  JsonController,
  CurrentUser
} from "routing-controllers";
import User from "../entities/User";
import Message from "../entities/Message";
import Profile from '../entities/Profile'


@JsonController()
export default class MessageController {

  @Get("/:chatId/messages")
  async getAllMessages(
    @Param('chatId')chatId : number){
    const messages = await Message.find({ where: { chatId: chatId } });
    return messages;
  }
  

  @Post("/:id/messages")
  @HttpCode(201)
  async addMessage(
    @Body() data: Message,
    @CurrentUser() user: User,
    @Param('id') id: number) {
      let name = await Profile.find({where:{userId: user.id}})
      let timeNow = new Date()
      let finalDate = `${timeNow.getFullYear()}-${timeNow.getMonth()}-${timeNow.getDate()}  ${timeNow.getHours()}:${timeNow.getMinutes()}`
    const message = await Message.create({
      content: data.content,
      userId: user.id,
      chatId:id,
      poster: `${name[0].firstName} ${name[0].lastName} `,
      time: finalDate
    }).save();

    return message;
  }
}

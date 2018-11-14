import {
  Get,
  Post,
  HttpCode,
  Param,
  Authorized,
  JsonController,
  CurrentUser,
  BadRequestError,
  Put,
  Body
} from 'routing-controllers';
import User from '../entities/User';
// import Message from '../entities/Message';
import Chat from '../entities/Chat';
import Profile from '../entities/Profile';

@JsonController()
export default class MessageController {
  @Get('/chats')
  async getAllChats(@CurrentUser() user: User) {
    const chatsInitiated = await Chat.find({ where: { userId: user.id } });
    let chatsAccepted = await Chat.find({ where: { secondUserId: user.id } });
    let results = await [chatsInitiated, chatsAccepted];
    return results;
  }

  @Authorized()
  @Post('/chats/:secondUserId')
  @HttpCode(201)
  async createChat(
    @CurrentUser() user: User,
    @Param('secondUserId') secondUserId: number
  ) {
    const receiverName: any = await Profile.find({
      where: { userId: secondUserId }
    });
    const creatorName: any = await Profile.find({ where: { userId: user.id } });

    const chat = await Chat.create({
      userId: user.id,
      secondUserId: secondUserId,
      creator: `${creatorName[0].firstName} ${creatorName[0].lastName} `,
      creatorPhoto: creatorName[0].photoUrl,
      receiver: `${receiverName[0].firstName} ${receiverName[0].lastName}`,
      receiverPhoto: receiverName[0].photoUrl,
      lastMessage:""
    }).save();

    return chat;
  }

  @Authorized()
  @Put('/chats/:id')
  @HttpCode(201)
  async saveLastMessage(
    @Param('id') id:number,
    @Body() lastMessage: Partial<Chat>
  ){
    console.log(lastMessage)
    let chat = await Chat.findOne({where:{id:id}})
    if (!chat) throw new BadRequestError("chat doesn't exist")
    return await Chat.merge(chat, lastMessage).save()
  }
}

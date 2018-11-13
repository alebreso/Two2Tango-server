import {
  Get,
  Post,
  HttpCode,
  Param,

  Authorized,
  JsonController,
  CurrentUser
} from 'routing-controllers';
import User from '../entities/User';
// import Message from '../entities/Message';
import Chat from '../entities/Chat';
import Profile from '../entities/Profile'

@JsonController()
export default class MessageController {
  @Get('/chats')
  async getAllChats(
      @CurrentUser() user: User) {
    const chats = await Chat.find({ where: {userId: user.id } })
    let allChats = await Chat.find({where:{ secondUserId: user.id}})
    let results = await [chats, allChats]
    return results
  }


  @Authorized()
  @Post('/chats/:secondUserId')
  @HttpCode(201)
  async createChat(
    @CurrentUser() user: User,
    @Param('secondUserId') secondUserId: number
  ) {
    const receiverName:any = await Profile.find({where:{userId:secondUserId}})
    const creatorName:any = await Profile.find({where:{userId:user.id}})

    const chat = await Chat.create({
      userId: user.id,
      secondUserId: secondUserId,
      creator: creatorName[0].firstName,
      receiver: receiverName[0].firstName
    }).save();

    return chat;
  }
}

import {
    Get,
    Post,
    CurrentUser,
    Param,
    HttpCode,
    JsonController
  } from "routing-controllers";

import User from '../entities/User'
import MatchedUsers from "../entities/MatchedUsers";
  
  
  @JsonController()
  export default class MatchedUsersController {
  
    
    @Get("/matchedUsers")
    async getAllMessages(){
        let matches = await MatchedUsers.find()
        let final = await matches.map(match => Object.values(match).splice(1,2))
        return final;
    }
    
  
    @Post("/matchUsers/:idTwo")
    @HttpCode(201)
    async matchUsers(
      @CurrentUser() user: User,
      @Param('idTwo') idTwo: number){
        let match = await MatchedUsers.create({
            userOne: user.id,
            userTwo: idTwo
        }).save()
      return match;
    }
  }
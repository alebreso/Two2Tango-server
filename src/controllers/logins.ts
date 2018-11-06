import {
  JsonController,
  Post,
  Body,
  BadRequestError
} from "routing-controllers";
import User from "../entities/User";
import { sign } from "../jwt";
import { IsString } from "class-validator";

class AuthenticatePayload {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

@JsonController()
export default class LoginController {
  @Post("/logins")
  async authenticate(@Body() data: AuthenticatePayload) {
    const { email, password } = data;
    const entity = await User.findOne({ email });
    if (!entity) throw new BadRequestError("User does not exist");
    if (!(await entity.checkPassword(password)))
      throw new BadRequestError("Invalid username/password");

    const jwt = sign({ id: entity.id });
    return { jwt };
  }
}

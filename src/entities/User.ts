import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany
} from "typeorm";
import * as bcrypt from "bcrypt";
import Profile from "./Profile";
import Preference from "./Preference";
import { Exclude } from "class-transformer";
import Chat from "./Chat";
import Message from "./Message";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: false, default: false })
  admin: boolean;

  @OneToOne(_ => Profile, profile => profile.user)
  profile: Profile;

  @OneToOne(_ => Preference, preference => preference.user)
  preference: Preference;

  @OneToMany(_=> Message, messages => messages.user)
  messages: Message[]

  @OneToMany(_ => Chat, chat => chat.user)
  chats: Chat;

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10);
    this.password = hash;
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
}

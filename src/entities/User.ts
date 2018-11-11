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

  @OneToOne(type => Profile, profile => profile.user)
  profile: Profile;

  @OneToOne(type => Preference, preference => preference.user)
  preference: Preference;

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10);
    this.password = hash;
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
}

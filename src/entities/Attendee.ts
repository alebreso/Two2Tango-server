import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
  ManyToOne
} from "typeorm";
import * as bcrypt from "bcrypt";
import Profile from "./Profile";
import Event from "./Event";
import Preference from "./Preference";
import { Exclude } from "class-transformer";
import User from "./User";
import Attendeedate from "./Attendeedate";

@Entity("attendees")
export default class Attendee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Event, event => event.attendees)
  event: Event;

  @ManyToOne(type => User, user => user.attendees)
  user: User;

  @OneToMany(type => Attendeedate, attendeedate => attendeedate.attendee)
  attendeedates: Attendeedate[];
}

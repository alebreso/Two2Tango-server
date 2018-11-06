import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  Timestamp,
  ManyToMany,
  ManyToOne
} from "typeorm";
import User from "./User";
import Event from "./Event";
import Attendee from "./Attendee";

// types

@Entity("attendeedates")
export default class Attendeedate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  startTime: string; //Timestamp

  @Column()
  endTime: string; //Timestamp

  @ManyToOne(type => Attendee, attendee => attendee.attendeedates)
  attendee: Attendee;
}

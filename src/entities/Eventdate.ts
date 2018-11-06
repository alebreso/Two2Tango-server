import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from "typeorm";
import Event from "./Event";

@Entity("eventdates")
export default class Eventdate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column("int")
  eventId: number;

  @ManyToOne(type => Event, event => event.eventdates, { onDelete: "CASCADE" })
  @JoinColumn()
  event: Event;
}

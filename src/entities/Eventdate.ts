import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  Timestamp,
  ManyToMany
} from "typeorm";
import User from "./User";

// types

@Entity("eventdates")
export default class Eventdate extends BaseEntity {
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
}

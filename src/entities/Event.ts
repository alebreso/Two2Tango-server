import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import User from "./User";
import Eventdate from "./Eventdate";

type Categories = "Salon" | "Class" | "Workshop" | "Festival";

@Entity("events")
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255, nullable: false })
  name: string;

  @Column("varchar", { length: 255, nullable: false })
  address: string;

  @Column("varchar", { nullable: false })
  city: string;

  @Column("varchar", { nullable: false })
  country: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  categories: Categories;

  @ManyToOne(type => User, user => user.events)
  user: User;

  @ManyToMany(type => User)
  @JoinTable({ name: "events_users" })
  users: User[];

  @ManyToMany(type => Eventdate)
  @JoinTable({ name: "events_eventdates" })
  dates: Eventdate[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany
} from "typeorm";
import User from "./User";
import Eventdate from "./Eventdate";
import Attendee from "./Attendee";

type Category = "Salon" | "Class" | "Workshop" | "Festival";

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
  category: Category;

  @Column("int", { nullable: true })
  creatorId: User;

  @ManyToOne(type => User, user => user.events)
  @JoinColumn({ name: "creatorId" })
  user: User;

  @OneToMany(type => Eventdate, eventdate => eventdate.event)
  eventdates: Eventdate[];

  @OneToMany(type => Attendee, attendee => attendee.event)
  attendees: Attendee[];
}

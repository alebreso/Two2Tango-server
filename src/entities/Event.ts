import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import User from "./User";
import { eventNames } from "cluster";
import Eventdate from "./Eventdate";

type Categories = "Salon" | "Class" | "Workshop" | "Festival";

@Entity()
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
  @JoinTable()
  users: User[];

  @ManyToMany(type => Eventdate)
  @JoinTable()
  dates: Eventdate[];
}

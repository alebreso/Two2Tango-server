import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  Unique,
  OneToMany
} from "typeorm";
import Profile from "./Profile";
import Event from "./Event";
import Preference from "./Preference";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(type => Profile, profile => profile.user)
  profile: Profile;

  @OneToMany(type => Event, event => event.user)
  events: Event[];

  @OneToOne(type => Preference, preference => preference.user)
  preference: Preference;
}

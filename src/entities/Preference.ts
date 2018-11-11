import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne
} from "typeorm";
import User from "./User";

type Role = "Follower" | "Leader" | "Both";
type Level = "Beginner" | "Intermediate" | "Advanced" | "Professional";
type Gender = "Male" | "Female" | "Other";
type Range = [number, number];
type levelRange = [string,string,string,string]

@Entity("preferences")
export default class Preference extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  role: Role;

  @Column("json", { nullable: false })
  level: levelRange;

  @Column("json", { nullable: true })
  age: Range;

  @Column({ nullable: false })
  gender: Gender;

  @Column("json", { nullable: false })
  height: Range;

  @Column("json", { nullable: true })
  city: levelRange;

  @Column("int", { nullable: true })
  userId: number;

  @OneToOne(type => User, user => user.preference, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}

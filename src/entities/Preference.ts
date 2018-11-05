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

@Entity()
export default class Preference extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  role: Role;

  @Column({ nullable: false })
  level: Level;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: false })
  gender: Gender;

  @Column({ nullable: false })
  height: number;

  @Column("varchar", { length: 255, nullable: false })
  city: string;

  @OneToOne(type => User, user => user.preference)
  @JoinColumn()
  user: User;
}

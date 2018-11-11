import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  CreateDateColumn
} from "typeorm";
import User from "./User";

type Role = "follower" | "leader" | "both";
type Level = "beginner" | "intermediate" | "advanced" | "professional";
type Gender = "male" | "female" | "other";

@Entity("profiles")
export default class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255, nullable: false })
  firstName: string;

  @Column("varchar", { length: 255, nullable: false })
  lastName: string;

  @Column({ nullable: false })
  role: Role;

  @Column({ nullable: false })
  level: Level;

  @Column({ nullable: false })
  photoUrl: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: false })
  gender: Gender;

  @Column({ nullable: false })
  height: number;

  @Column("varchar", { length: 255, nullable: false })
  city: string;

  @Column("text", { nullable: true })
  about: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column("int", { nullable: true })
  userId: number;

  @OneToOne(type => User, user => user.profile, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}

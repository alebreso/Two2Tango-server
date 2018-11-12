import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from "typeorm";
import User from "./User";

@Entity("messages")
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column("int", { nullable: false })
  userId: number;

  @ManyToOne(_ => User, user => user.messages, { onDelete: "CASCADE" })
  user: User;
}

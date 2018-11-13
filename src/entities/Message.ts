import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from "typeorm";
import Chat from "./Chat";
import User from "./User";

@Entity("message")
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column({nullable:true})
  chatId: number;

  @Column({nullable:false})
  poster: string;

  @Column('date', {nullable:false})
  time: string

  @Column("int", { nullable: false })
  userId: number;

  @ManyToOne(_ => User, user => user.messages)
  @JoinColumn({name: "userId"})
  user: User

  @ManyToOne(_=> Chat, chat => chat.messages)
  @JoinColumn({ name: "chatId" })
  chat: Chat
}

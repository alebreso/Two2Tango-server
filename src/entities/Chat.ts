import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany
  } from "typeorm";
  import User from "./User";
import Message from "./Message";
  
  @Entity("chat")
  export default class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int", { nullable: true })
    userId: number;

    @Column({nullable:false})
    creator: string

    @Column({nullable:true})
    creatorPhoto: string

    @Column({nullable:false})
    receiver: string

    @Column({nullable:true})
    receiverPhoto: string

    @Column("int", { nullable: true })
    secondUserId: number
  
    @ManyToOne(_ => User, user => user.chats, { onDelete: "CASCADE" })
    user: User;

    @OneToMany(_=> Message, message => message.chat, {onDelete:"CASCADE"})
    messages: Message
  }
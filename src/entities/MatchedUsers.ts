import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from "typeorm";
  
  @Entity("matchedUsers")
  export default class MatchedUsers extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    userOne: number;
  
    @Column({nullable:false})
    userTwo: number;
  }
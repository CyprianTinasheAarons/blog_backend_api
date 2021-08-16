import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => String)
    @Column()
    username: string;

    @Field(() => String)
    @Column()
    email: string;

    @Field(() => String)
    @Column()
    password: string;

    @Field(() => String)
    @Column()
    token: string;

}
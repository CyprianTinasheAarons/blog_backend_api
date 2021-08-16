import { ObjectType , Field , ID } from "type-graphql"
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm"

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string

    @Field(() => String)
    @Column()
    image: string
    
    @Field(() => String)
    @Column()
    title: string

    @Field(() => String)
    @Column()
    subtitle: string

    @Field(() => String)
    @Column()
    content: string

    @Field(()=> String)
    @Column()
    date: string

    @Field(() => String)
    @Column()
    author: string

}
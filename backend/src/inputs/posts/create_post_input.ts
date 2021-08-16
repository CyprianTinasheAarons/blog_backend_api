import { InputType, Field } from "type-graphql";

@InputType()
export class CreatePostInput {

    @Field({nullable: true})
    image?: string;

    @Field()
    title: string;

    @Field()
    subtitle: string;

    @Field()
    content: string;

    @Field()
    date: string;

    @Field()
    author: string;

}
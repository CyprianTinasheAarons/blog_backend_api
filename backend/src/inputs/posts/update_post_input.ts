import { InputType, Field } from "type-graphql";

@InputType()
export class UpdatePostInput {

    @Field({nullable: true})
    image?: string;

    @Field({nullable: true})
    title?: string;

    @Field({nullable: true})
    subtitle?: string;

    @Field({nullable: true})
    content?: string;

    @Field({nullable: true})
    date?: string;

    @Field({nullable: true})
    author?: string;

}
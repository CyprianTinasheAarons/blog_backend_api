import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql"
import { Post } from "../models/post"
import { CreatePostInput } from "../inputs/posts/create_post_input"
import { UpdatePostInput } from "../inputs/posts/update_post_input"


@Resolver()
export class PostResolver {

    // Get all the posts 
    @Query(() => [Post])
    getPosts() {
        return Post.find()
    }

    // Get a Single Post
    @Query(() => Post)
     async getPost(@Arg("id") id: string) {
        let post = await Post.findOne({ where: { id: id } })
        return { post }
    }

    // Create a new Post
    @Mutation(() => Post)
    async createPost(@Arg("data") data: CreatePostInput) {
        const post = Post.create(data)
        await post.save()
        return post
    }

    // Update a Post
    @Mutation(() => Post)
    async updatePost(@Arg("id") id: string, @Arg("data") data: UpdatePostInput) {
        const post = await Post.findOne({ where: { id: id } })
        
        if (!post) {
            throw new Error("Post not found")
        }

        Object.assign(post, data)
        await post.save()

        return post
    }

    // Delete a Post
    @Mutation(() => Post)
    async deletePost(@Arg("id") id: string) {
        const post = await Post.findOne({ where: { id: id } })
        
        if (!post) {
            throw new Error("Post not found")
        }

        await post.remove()

        return { id }
    }

} 
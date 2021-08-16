import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './src/resolvers/user_resolver'
import { PostResolver } from './src/resolvers/post_resolver'


async function runServer() {
    const connection = await createConnection()
    const schema = await buildSchema({
        resolvers: [UserResolver ,PostResolver ]
    })

    const server = new ApolloServer({ schema })
    await server.listen(8060)

    console.log('GraphQL Server is running on port 8060')
}

runServer()
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../models/user";
import { RegisterInput } from "../inputs/users/register_input";
import { LoginInput } from "../inputs/users/login_input";
import { UserResponse } from "../inputs/users/user_response";

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

@Resolver()
export class UserResolver {

    //Get Users
    @Query(() => [User])
    users() {
        return User.find();
    }

    // User Register
    @Mutation(() => UserResponse)
    async register(@Arg("options") options: RegisterInput, @Ctx() { req }: any): Promise<UserResponse> {

        //Username Validation
        if ( options.username.length < 3) {

            return {
                errors: [
                    { field: "username", message: "Username must be at least 3 characters long" }
                ]
            }
        }
        // Username already exists
        const userNameExists = await User.findOne({ where: { username: options.username } });
        if (userNameExists) {
            return {
                errors: [
                    { field: "username", message: "Username already exists" }
                ]
            }
        }

        //Email Validation
        if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(options.email)) {
            return {
                errors: [
                    { field: "email", message: "Invalid email address" }
                ]
            }
        }
        // Email already exists
        const emailExists = await User.findOne({ where: { email: options.email } });
        if (emailExists) {
            return {
                errors: [
                    { field: "email", message: "Email already exists" }
                ]
            }
        }

        //Password Validation
        if ( options.password.length < 8) {
            return {
                errors: [
                    { field: "password", message: "Password must be at least 8 characters long" }
                ]
            }
        }

        const hashPassword = await argon2.hash(options.password)
        let user: User | undefined = undefined
        try {
            user = await User.create({
                username: options.username,
                email: options.email,
                password: hashPassword,
                token: jwt.sign({ userId: options.username }, 'secret', { expiresIn: 86400 })
            }).save();
        } catch (err) {
            return {
                errors: [
                    { field: "Error", message: err.message }
                ]
            }   
        }
    
    return { user } 
    }
    
    // User Login
    @Mutation(() => UserResponse)
    async login(@Arg("options") options: LoginInput): Promise<UserResponse> {
        const user = await User.findOne({ where: { username: options.username } });

        if (!user) {
            return {
                errors: [
                    { field: "username", message: "Username not found" }
                ]
            }
        }

        const validPassword = await argon2.verify(user.password, options.password)
        if (!validPassword) {
            return {
                errors: [
                    { field: "password", message: "Invalid password" }
                ]
            }
        }
        return { user, token: jwt.sign({ userId: user.id }, 'secret', { expiresIn: 86400 }) }

    }

}
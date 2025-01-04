import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSigninDto {
    @IsNotEmpty({message : "email should not be null"})
    @IsEmail({}, {message : "email is not valid"})
    email : string;

    @IsNotEmpty({message : "password should not be null"})
    @MinLength(6 , {message : "min length must be greater or equall 6"})
    password : string;
}
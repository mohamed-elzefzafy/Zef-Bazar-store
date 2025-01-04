import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserSigninDto } from "./user-signin.dto";

export class UserSignupDto extends UserSigninDto {
    @IsNotEmpty({message : "name should not be null"})
    @IsString({message : "name must be a string"})
    name : string;
}
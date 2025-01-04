import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSigninDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-user.decorator';
import {  Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizedGuard } from 'src/utility/guards/authorization.guard';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signin")
  public async signin(@Body() userSigninDto: UserSigninDto)  {
    const user = await this.usersService.signin(userSigninDto);
    const acccessToken =await this.usersService.accessToken(user);
  return {user, acccessToken};
  }
  @Post("signup")
  signup(@Body() userSignupDto: UserSignupDto) : Promise<UserEntity> {
    console.log("userSignupDto");
    
    return this.usersService.signup(userSignupDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

 @UseGuards(AuthenticationGuard , AuthorizedGuard([Roles.ADMIN]))
  @Get("all")
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get('single/:id')
  findOne(@Param('id' , ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get("me")
  public getProfile(@CurrentUser() currentUser : UserEntity) {
  return currentUser;
  }
}

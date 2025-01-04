import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-signup.dto';
import { compare, hash } from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

    async signin(userSigninDto: UserSigninDto) : Promise<UserEntity> {
    console.log(userSigninDto);

    const existUser = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSigninDto.email })
      .getOne();

    if (!existUser) {
      throw new BadRequestException('bad credentials');
    }

    const matchPassword = await compare(
      userSigninDto.password,
      existUser.password,
    );

    if (!matchPassword) {
      throw new BadRequestException('bad credentials');
    }

    delete existUser.password;

    return existUser;
  }

  async signup(userSignupDto: UserSignupDto) {
    const existUser = await this.findUserByEmail(userSignupDto.email);
    if (existUser) {
      throw new BadRequestException('Email already exists');
    }

    // userSignupDto.password = await hash(userSignupDto.password, 10);
    userSignupDto.password = await hash(userSignupDto.password, 10);
    let user = this.userRepository.create(userSignupDto);
    user = await this.userRepository.save(user);
    delete user.password;
    return user;
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  public async findAll() : Promise<UserEntity[]> {
  return await this.userRepository.find();
  }

  public async findOne(id: number) : Promise<UserEntity> {
    const user  =  await this.userRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException(`user with id (${id}) is not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async accessToken(users: UserEntity) : Promise<string>{
 return  sign(
      { id: users.id, email: users.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_expiretime },
    );
  }
}

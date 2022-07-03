import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { User } from '../users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { Token } from './auth.interface';
import { RegisterDto } from './dto/registerdto';
import { cleanEmail, validateEmail } from 'src/shared/email';
import { sendEmail } from '../shared/mail';
import { ResendDto, TokenDto } from './dto/tokendto';
import { Role } from 'src/enums/role.enum';

const gen = () => {
  var p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return [...Array(6)].reduce((a) => a + p[~~(Math.random() * p.length)], '');
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (
      !(await verify(
        await (
          await this.usersService.getPassword(user.id)
        ).password,
        pass,
      ))
    )
      throw new HttpException(
        'Password is not correct',
        HttpStatus.FAILED_DEPENDENCY,
      );
    return user;
  }

  async login(user: Token) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(object: RegisterDto): Promise<string> {
    const { fullName, password } = object;
    const email = cleanEmail(object.email);
    try {
      if (!validateEmail(email)) throw new Error('Email is invalid');
      if (password.length < 6)
        throw new Error('Password less than 6 characters');
      const user = await this.usersService.create({
        email,
        fullName,
        password,
      });

      const token = gen();
      if (await sendEmail(email, token)) {
        const signed = this.jwtService.sign(
          { token },
          {
            expiresIn: '5m',
          },
        );
        await this.usersService
          .update(user.id, { token: signed })
          .catch((err) => {
            throw new Error(err.message);
          });
      }

      return `User ${user.id} created successfully. Check email for verification token.`;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async registerSeller(object: RegisterDto): Promise<string> {
    const { fullName, password } = object;
    const email = cleanEmail(object.email);
    try {
      if (!validateEmail(email)) throw new Error('Email is invalid');
      if (password.length < 6)
        throw new Error('Password less than 6 characters');
      const user = await this.usersService.createSeller({
        email,
        fullName,
        password,
      });

      const token = gen();
      if (await sendEmail(email, token)) {
        const signed = this.jwtService.sign(
          { token },
          {
            expiresIn: '5m',
          },
        );
        await this.usersService
          .update(user.id, { token: signed })
          .catch((err) => {
            throw new Error(err.message);
          });
      }

      return `User ${user.id} created successfully. Check email for verification token.`;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async verify(object: TokenDto): Promise<string> {
    const plaintoken = object.token;
    const email = cleanEmail(object.email);

    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new Error('No user found with that email');
      }
      if (user.verified) {
        throw new Error('User already verified');
      }
      const token = await this.jwtService.verify(user.token).token;
      if (token !== cleanEmail(plaintoken)) throw new Error('Token is invalid');

      await this.usersService.update(user.id, {
        verified: true,
        active: user.roles.includes(Role.Seller) ? false : true,
      });
      return 'Verified successfully';
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async resend(object: ResendDto): Promise<string> {
    const old_email = cleanEmail(object.old_email);
    const new_email = cleanEmail(object.new_email);

    try {
      if (!validateEmail(new_email)) throw new Error(`${new_email} is invalid`);
      const user = await this.usersService.findByEmail(old_email);
      if (!user) {
        throw new Error('No user found with that email');
      }
      if (user.verified) {
        throw new Error('User already verified');
      }
      const token = gen();
      await this.usersService
        .update(user.id, {
          email: new_email,
        })
        .catch((err) => {
          throw new Error(err.message);
        });
      if (await sendEmail(new_email, token)) {
        const signed = this.jwtService.sign(
          { token },
          {
            expiresIn: '5m',
          },
        );
        await this.usersService
          .update(user.id, { token: signed })
          .catch((err) => {
            throw new Error(err.message);
          });
      }
      return 'Verification token sent successfully';
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

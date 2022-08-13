import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { SignUpInputDto, SignInInput } from './dto/auth.dto';
const SALT_ROUNDS = 10;
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(body: SignUpInputDto) {
    try {
      const hash = await bcrypt.hash(body.password, SALT_ROUNDS);
      await this.prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          hash: hash,
        },
      });
      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async signIn({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.hash);
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }
    const access_token = await this.signToken(user.id, user.email);
    return {
      status: HttpStatus.OK,
      message: 'User signed in successfully',
      access_token,
      user,
    };
  }

  signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '5h',
    });
  }
}

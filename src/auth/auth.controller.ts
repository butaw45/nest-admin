import { BadRequestException, Body, Controller, NotFoundException, Post, Res, Get, Req, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

//? UseInterceptors(ClassSerializerInterceptor) Agar tidak menampilkan password pada response API  
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService
        ){
        
    }
    
    @Post('register')
    async register(@Body() body: RegisterDto) {
        if(body.password !== body.password_confirm){
            throw new BadRequestException('Password do not match!');
        }

        const hashed = await bcrypt.hash(body.password, 12);
        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashed,
            // Role 1 = admin | 2 = user | 3 = guest sesuaikan dengan role yang ada di database
            role: {id: 2}
        });
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string, 
        @Res({passthrough:true}) response: Response
    ){
        const user = await this.userService.findOne({email});
        if(!user){
            throw new NotFoundException('User not found!');
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new BadRequestException('Invalid credentials!');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

       response.cookie('jwt', jwt, {httpOnly: true});

        return user;
       
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request){

        const id = await this.authService.userId(request);
        // const cookie = request.cookies['jwt'];

        // const data = await this.jwtService.verifyAsync(cookie);

        return this.userService.findOne({id});
    }
    

        @UseGuards(AuthGuard)
        @Post('logout')
        async logout(@Res({passthrough:true}) response: Response){
        response.clearCookie('jwt');

        return{
            message: 'Logout success!'
        }
    }
}

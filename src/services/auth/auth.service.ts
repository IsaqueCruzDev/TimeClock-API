import { Injectable } from '@nestjs/common';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(
        private readonly bcryptService: BcryptService,
        private readonly userService: UserService
    ) {}

    async login(data: { email: string, password: string }) {
        const { email, password } = data
        const foundUser = await this.userService.getUser(email)
        const isMatch = this.bcryptService.comparePasswords(password, foundUser.password)

        if (!isMatch) {
            throw new Error("Senha incorreta!")
        }

        const token = jwt.sign(
            { id: foundUser.id, email: foundUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '3h'}
        )

        const returnData = {
            token,
            ...foundUser
        }

        return returnData
    }
}

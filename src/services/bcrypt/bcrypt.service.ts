import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt"

@Injectable()
export class BcryptService {

    async hashedPassword(password: string) {
        const saltOrRounds = 10
        const hash = await bcrypt.hash(password, saltOrRounds)
        return hash
    }

    async comparePasswords(password, hash) {
        const isMatch = await bcrypt.compare(password, hash)
        return isMatch
    }
}

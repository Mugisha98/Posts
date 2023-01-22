import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import { rootCertificates } from 'tls';

class UserService {
    private user = UserModel;

    public register = async (
        nameFirst:string, 
        nameLast: string, 
        email: string, 
        password: string,
        role: string
    ): Promise<string | Error> => {
            try {
                const user = await this.user.create({ nameFirst, nameLast, email, password, role });

                const accessToken = token.createToken(user);

                return accessToken;
            } catch (error) {
                throw new Error("Unable to register");
            }
    }

    public login = async (
        email: string, 
        password: string
        ): Promise<string | Error> => {
        try {
            const user = await this.user.findOne({ email });
            if(!user) {
                throw new Error("User not found");
            }
            if( await user.isValidPassword(password)) {
                return token.createToken(user);
            }else {
                throw new Error("Invalid password");
            }
        } catch (error) {
            throw new Error("Unable to login");
        }
    }
}
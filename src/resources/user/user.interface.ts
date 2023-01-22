import { Document } from 'mongoose'


interface IUser extends Document {
    email: string;
    password: string;
    nameFirst: string;
    nameLast: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    isValidPassword: (password: string) => Promise<Error | boolean>;
}

export default IUser
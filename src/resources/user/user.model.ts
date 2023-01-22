import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import IUser from "@/resources/user/user.interface";

const UserSchema = new Schema(
    {
        nameFirst: {
            type: String,
            required: true
        },
        nameLast: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
)

UserSchema.pre<IUser>("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (error: any) {
        return next(error);
    }
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
    try {
        return await bcrypt.compare(password, this.password
        );
    } catch (error: any) {
        throw new Error(error);
    }
};

export default model<IUser>("User", UserSchema);
import { Schema, model, Model } from 'mongoose';

export interface User {
    id?: Schema.Types.ObjectId;
    name: string;
    email: string;
    publicKey: string;
}

interface UserModelInterface extends Model<User> {
    // declare any static methods here
    isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
    isUsernameTaken(username: string, excludeUserId?: string): Promise<boolean>;
}

export const schema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        publicKey: {
            type: String,
            unique: true,
            sparse: true,
        }
    },
    {
        timestamps: true
    }
)

schema.static('isEmailTaken', async function (email: string, excludeUserId: string): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
});

export const User = model<User, UserModelInterface>('User', schema);

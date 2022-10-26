import { ApiError } from "../../utils/ApiError";
import { User } from "../../models/user.model";
import httpStatus from "http-status";
import _sodium from 'libsodium-wrappers';
import { ObjectId } from "mongoose";

export class UserManager {
    public createUser = async (user: Partial<User>, publicKey: string): Promise<User> => {
        if (user.email && await User.isEmailTaken(user.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }
        Object.assign(user, { publicKey: publicKey });
        return User.create(user);
    }

    public getUserById = async (id: ObjectId | string) => {
        return User.findById(id);
    };

    public convertStrToAB = async (str: string) => {
        return new Uint8Array(Buffer.from(str, 'base64'));
    }

    public createSigningKey = async () => {
        await _sodium.ready;
        const sodium = _sodium;

        const keyspair = sodium.crypto_sign_keypair();

        const publicKey = Buffer.from(keyspair.publicKey).toString('base64');
        const privateKey = Buffer.from(keyspair.privateKey).toString('base64');

        return { publicKey, privateKey };
    }

    public createSignature = async (message: string, privateKey: any) => {
        await _sodium.ready;
        const sodium = _sodium;
        let uint8Array = await this.convertStrToAB(privateKey);
        const signature = sodium.crypto_sign_detached(message, uint8Array)
        return Buffer.from(signature).toString('base64');
    }

    public verifyUser = async (userId: ObjectId | string, message: string, signature: any) => {
        const user = await this.getUserById(userId);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        await _sodium.ready;
        const sodium = _sodium;
        let signatureBuffer = await this.convertStrToAB(signature);
        let publicKeyBuffer = await this.convertStrToAB(user.publicKey);

        const isVerified = sodium.crypto_sign_verify_detached(signatureBuffer, message, publicKeyBuffer);

        return isVerified;
    }
}
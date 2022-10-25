import { ApiError } from "../../utils/ApiError";
import { User } from "../../models/user.model";
import httpStatus from "http-status";

export class UserManager {
    public createUser = async (user: Partial<User>): Promise<User> => {
        if (user.email && await User.isEmailTaken(user.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }
        return User.create(user);
    }
}
import UserModel from "./user.schema.js";
import crypto from "crypto";

export default class UserRepository {
    async createUser(userData) {
        try {
            const user = new UserModel(userData);
            const createdUser = await user.save();
            return createdUser;
        } catch (error) {
            console.log(error);
        }
    }

    async findUser(factor) {
        try {
            return await UserModel.findOne(factor);
        } catch (error) {
            console.log(error);
        }
    }
    async verifyResetOtp(otp) {
        const hashToken = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");
        return await UserModel.findOne({
            restPasswordToken: hashToken,
            resetPasswordTokenExpiry: { $gt: Date.now() },
        });
    }
}
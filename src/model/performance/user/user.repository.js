import UserModel from "./user.schema.js";
import crypto from "crypto";
import './userId.schema.js';
import { UserIdModel, getNextCounter } from "./userId.schema.js";
import AssignReviewModel from "./assign-review.schema.js";

export default class UserRepository {
    async employeeRegister(userData) {
        try {
            userData.customId = await getNextCounter();
            const user = new UserModel(userData);
            const createdUser = await user.save();
            return createdUser;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAllUserBySpecifiedFactor(factor, select = false) {
        try {
            if (select) {
                return await UserModel.find(factor).select('-password');
            }
            return await UserModel.find(factor);
        } catch (error) {
            throw new Error(error);
        }
    }
    async findUserBySkip(filterFactor, skip, limit, select = false) {
        if (select) {
            if (limit) {
                return await UserModel.find(filterFactor).skip(skip).limit(limit).select('-password');
            }
            return await UserModel.find(filterFactor).skip(skip).select('-password');
        } else {
            if (limit) {
                return await UserModel.find(filterFactor).skip(skip).limit(limit);
            }
            return await UserModel.find(filterFactor).skip(skip);

        }
    }

    async findUserBySpecifiedFactor(factor) {
        try {
            return await UserModel.findOne(factor);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUserBySpecificFactor(factor) {
        try {
            return await UserModel.deleteOne(factor);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUserBySpecificFactor(id, updateData) {
        try {
            return await UserModel.findOneAndUpdate({ customId: id }, updateData, { new: true })
        } catch (error) {
            throw new Error(error);
        }
    }

    // async getAllUserFeedbackPending(userId) {
    //     try {
    //         return await UserModel.find({ customId: { $nin: UserModel.reviewBy } })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async verifyResetOtp(otp) {
        const hashToken = crypto.createHash("sha256").update(otp).digest("hex");
        return await UserModel.findOne({
            restPasswordToken: hashToken,
            resetPasswordTokenExpiry: { $gt: Date.now() },
        });
    }

    async getAllUsersPendingReview(userId) {
        try {
            return await AssignReviewModel.find({ fromEmployeeId: userId, status: "Pending" }).populate('fromEmployeeId').populate('toEmployeeId');
        } catch (error) {
            throw new Error(error);
        }
    }

    async addReviewPending(data) {
        try {

            const pendingReview = new AssignReviewModel(data);
            const savedPendingReview = pendingReview.save();
            return savedPendingReview;
        } catch (error) {
            throw new Error(error);
        }
    }

    async changeReviewStatusDone(from, to) {
        try {
            return await AssignReviewModel.findOneAndUpdate({ fromEmployeeId: from, toEmployeeId: to, status: "Pending" }, { status: "Done" }, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

}
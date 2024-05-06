import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { type } from "os";
import AssignReviewModel from "./assign-review.schema.js";
import PerformanceReviewModel from "../performance.schema.js";

const userSchema = new mongoose.Schema({
    customId: {
        type: String,
        required: true,
        unique: [true, "customId should be unique"]
    },
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: [3, "name length should be greater than 3"],
        maxLength: [20, "name length should not be more than 20"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: {
            validator: function(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: "invalid email",
        },
        unique: [true, "email already present"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    phone: {
        type: Number,
        minLength: [10, "invalid phone number"],
        maxLength: [16, "invalid phone number"],
    },
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        default: "Employee",
        enum: ["Employee", "Admin"],
    },
    jobTitle: {
        type: String,
    },
    department: {
        type: String,
    },
    location: {
        type: String,
    },
    restPasswordToken: String,
    resetPasswordTokenExpiry: Date,
});
userSchema.pre("deleteOne", async function(next) {
    try {
        console.log("remove");

        const assign = await AssignReviewModel.deleteMany({
            $or: [
                { fromEmployeeId: this.getQuery()._id },
                { toEmployeeId: this.getQuery()._id }
            ]
        });
        const perfor = await PerformanceReviewModel.deleteMany({
            $or: [
                { employeeId: this.getQuery()._id },
                { reviewerId: this.getQuery()._id }
            ]
        });
        console.log(assign, perfor);
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.pre("save", async function(next) {
    //  hash user password before saving using bcrypt
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetPasswordOtp = async function() {
    const otp = (
        Math.floor(Math.random() * (100000 - 999999 + 1)) + 999999
    ).toString();
    this.restPasswordToken = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
    this.resetPasswordTokenExpiry = Date.now() + 10 * 60 * 1000;
    return otp;
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
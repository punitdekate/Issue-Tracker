import UserRepository from "../../model/user/user.repository.js";
import { sendPasswordForgetEmail } from "../../../utils/mail.handler.js";
import UserModel from "../../model/user/user.schema.js";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }
    showRegister(req, res, next) {
        return res.render("user-register", { "error": null });
    }

    async registerUser(req, res, next) {
        const { name, email, password } = req.body;
        try {
            const user = await this.userRepository.findUser({ email: email });
            if (user) {
                return res.render('user-register', { "error": { msg: "email already registerd" } })
            } else {
                await this.userRepository.createUser(req.body);
                return res.render("main-page");
            }
        } catch (error) {
            console.log(error);
        }
    }

    showLogin(req, res, next) {
        return res.render('user-login', { "error": null });
    }

    async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.findUser({ email: email });
            if (!user) {
                return res.render('user-login', { "error": "Invalid credentials" });
            } else {
                let verified = await user.comparePassword(password);
                if (verified) {
                    return res.render('user-login', { "error": "Incorrect password" });
                } else {
                    res.cookie("userEmail", email, {
                        maxAge: 1 * 24 * 60 * 60
                    });
                    res.cookie("userId", user._id, {
                        maxAge: 1 * 24 * 60 * 60
                    })
                    req.session.userId = user._id;
                    req.session.userEmail = email;
                    return res.render('main-page', { "userEmail": email });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    showForgetPassword(req, res, next) {
        return res.render('user-password-reset', { "error": null })
    }

    async sendOtp(req, res, next) {
        const { email } = req.body;
        try {
            console.log(email);
            const user = await this.userRepository.findUser({ email: email });
            if (!user) {
                return res.render('user-password-reset', { "error": { msg: "Email not registered" } })
            } else {
                const otp = await user.getResetPasswordOtp();
                await user.save();
                await sendPasswordForgetEmail(user, otp);
                res.cookie("userEmail", email, {
                    maxAge: 1 * 24 * 60 * 60
                });
                req.session.userEmail = email;
                return res.render('user-otp-verify', { "error": null })
            }
        } catch (error) {
            console.log(error);
        }

    }

    async resendOtp(req, res, next) {
        const email = req.session.userEmail;
        try {
            if (!email) {
                return res.render('error-404');
            } else {
                const user = await this.userRepository.findUser({ email: email });
                if (!user) {
                    return res.render('user-password-reset', { "error": { msg: "Email not registered" } })
                } else {
                    const otp = await user.getResetPasswordOtp();
                    await user.save();
                    await sendPasswordForgetEmail(user, otp);
                    res.cookie("userEmail", email, {
                        maxAge: 1 * 24 * 60 * 60
                    });
                    req.session.userEmail = email;
                    return res.render('user-otp-verify', { "error": null })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async verifyResetOtp(req, res, next) {
        try {
            const { otp } = req.body;
            const verified = await this.userRepository.verifyResetOtp(otp);
            if (!verified) {
                return res.render('user-otp-verify', { "error": { msg: "OTP expired or mismatch" } })
            } else {
                return res.render('user-new-password', { "error": null });
            }
        } catch (error) {
            console.log(error);
        }
    }


    async resetPassword(req, res, next) {
        const email = req.session.userEmail;
        if (!email) {
            return res.render('error-404');
        }
        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.render('user-new-password', { "error": { msg: "Password mismatch" } });
        } else {
            const user = await this.userRepository.findUser({ email: email });
            if (!user) {
                return res.render('error-404');
            } else {
                req.session.destroy((err) => {
                    if (err) {
                        console.error('Error destroying session:', err);
                        return res.status(500).send('Error destroying session');
                    }
                    return res.redirect('/login');
                });
            }
        }
    }
}
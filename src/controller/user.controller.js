import UserRepository from "../model/performance/user/user.repository.js";
import PerformanceRepository from "../model/performance/performance.repository.js";
import AssignReviewModel from "../model/performance/user/assign-review.schema.js";
export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
        this.performanceRepository = new PerformanceRepository()
    }

    renderAdminLogin(req, res, next) {
        res.render('admin-login', { error: null, user: null })
    }

    renderEmployeeLogin(req, res, next) {
        res.render('employee-login', { error: null, user: null })
    }

    renderEmployeeRegistration(req, res, next) {
        res.render('employee-register', { error: null, user: null });
    }
    async renderMainPage(req, res, next) {
        try {
            const feedbackRecieved = await this.performanceRepository.findAllPerformanceBySpecifiedFactor({ employeeId: req.cookies.user.userId });
            const feedbackSend = await this.performanceRepository.findAllPerformanceBySpecifiedFactor({
                reviewerId: req.cookies.user.userId
            });
            return res.render('landing', { user: req.cookies.user, feedbackRecieved: feedbackRecieved, feedbackSend: feedbackSend });

        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }

    }

    async renderAllEmployees(req, res, next) {
        try {
            const employees = await this.userRepository.findAllUserBySpecifiedFactor({ _id: { $ne: req.cookies.user.userId } }, true);
            return res.render('employees', { employees: employees, user: req.cookies.user })
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }
    async renderUpdateEmployee(req, res, next) {
        try {
            const employee = await this.userRepository.findUserBySpecifiedFactor({ customId: req.params.customId });
            return res.render('employee-update', { error: null, employee: employee, user: req.cookies.user })

        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }

    async renderEmployeeView(req, res, next) {
        try {
            const employee = await this.userRepository.findUserBySpecifiedFactor({ customId: req.params.customId });
            return res.render('employee-view', { error: null, employee: employee, user: req.cookies.user })

        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }

    render404(req, res, next) {
        return res.render('404', { user: null });
    }

    async postEmployeeRegistration(req, res, next) {
        try {
            const user = await this.userRepository.employeeRegister(req.body);
            if (user) {
                return res.redirect('/employee_login');
            } else {
                return res.redirect('/error_404');
            }
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }


    async postEmployeeLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.findUserBySpecifiedFactor({ email: email, role: "Employee" });
            if (!user) {
                return res.render('employee-login', { user: null, "error": { msg: "Invalid credentials" } });
            } else {
                let verified = await user.comparePassword(password);
                if (!verified) {
                    return res.render('employee-login', { user: null, "error": { msg: "Incorrect password" } });
                } else {
                    const userObj = {
                        userId: user._id,
                        userName: user.name,
                        userRole: user.role,
                        userEmail: user.email,
                        userJobTitle: user.jobTitle
                    }
                    res.cookie("user", userObj, {
                        maxAge: 1 * 24 * 60 * 60
                    });
                    req.session.userId = user._id;
                    req.session.userEmail = email;
                    return res.redirect('/main_page');
                }
            }
        } catch (error) {
            console.log(error)
            return res.redirect('/error_404');
        }
    }

    async postAdminLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.findUserBySpecifiedFactor({ email: email, role: "Admin" });
            if (!user) {
                return res.render('admin-login', { user: null, "error": "Invalid credentials" });
            } else {
                let verified = await user.comparePassword(password);
                if (!verified) {
                    return res.render('admin-login', { user: null, "error": { msg: "Incorrect password" } });
                } else {
                    const userObj = {
                        userId: user._id,
                        userName: user.name,
                        userRole: user.role,
                        userEmail: user.email,
                        userJobTitle: user.jobTitle
                    }
                    res.cookie("user", userObj, {
                        maxAge: 1 * 24 * 60 * 60
                    });
                    req.session.userId = user._id;
                    req.session.userEmail = email;
                    return res.redirect('/main_page');
                }
            }
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }

    async deleteEmployee(req, res, next) {
        try {
            const deletedEmployee = await this.userRepository.deleteUserBySpecificFactor({ _id: req.params._id });
            return res.redirect('/main_page/view_employee');
        } catch (error) {
            return res.redirect('/error_404');
        }
    }

    async updateEmployee(req, res, next) {
        try {
            const updateEmployee = await this.userRepository.updateUserBySpecificFactor(req.params.customId, req.body);
            return res.redirect('/main_page/view_employee');
        } catch (error) {
            return res.redirect('/error_404');
        }
    }

    async updateRole(req, res, next) {
        try {
            const updateEmployee = await this.userRepository.updateUserBySpecificFactor(req.params.customId, { role: "Admin" });
            return res.redirect('/main_page/view_employee');
        } catch (error) {
            return res.redirect('/error_404');
        }
    }

    async renderAssignReview(req, res, next) {
        try {
            const employees = await this.userRepository.findAllUserBySpecifiedFactor({});
            return res.render('assign-feedback', { error: null, user: req.cookies.user, employees: employees });
        } catch (error) {
            return res.redirect('/error_404');
        }
    }


    async renderPendingReviews(req, res, next) {
        try {
            const pendingReviews = await this.userRepository.getAllUsersPendingReview(req.cookies.user.userId)
            console.log(req.cookies.user.userId);
            console.log(pendingReviews);
            return res.render('pending-review', { error: null, pendingReviews: pendingReviews, user: req.cookies.user })
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }

    async renderReviewForFeedback(req, res, next) {
        try {
            return res.render('employee-pending-review', { error: null, feedback: req.query, user: req.cookies.user });
        } catch (error) {
            return res.redirect('/error_404');
        }
    }
    async assignReview(req, res, next) {
        try {
            console.log(req.body);
            const addReview = await this.userRepository.addReviewPending(req.body);
            return res.redirect('/main_page');
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }
}
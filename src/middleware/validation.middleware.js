import { body, validationResult } from 'express-validator'
/**Registration validation middleware */
import UserModel from '../model/performance/user/user.schema.js';
import AssignReviewModel from '../model/performance/user/assign-review.schema.js';
export const validateEmployeeLogin = async(req, res, next) => {
    const rules = [
        body('email').notEmpty().withMessage("Email is required"),
        body('email').isEmail().withMessage("Invalid email"),
        body('password').notEmpty().withMessage('Password is required'),
        body('password').isLength({ min: 8 }).withMessage('password must be between 8 and 16 characters long and contain at least one uppercase letter and one lowercase letter'),
        body('password').isLength({ max: 16 }).withMessage('password must be between 8 and 16 characters long and contain at least one uppercase letter and one lowercase letter'),
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('employee-login', { "error": errors[0], user: null });
    }
    next();
}

export const validateAdminLogin = async(req, res, next) => {
    const rules = [
        body('email').notEmpty().withMessage("Email is required"),
        body('email').isEmail().withMessage("Invalid email"),
        body('password').notEmpty().withMessage('Password is required'),
        body('password').isLength({ min: 8 }).withMessage('password must be between 8 and 16 characters long and contain at least one uppercase letter and one lowercase letter'),
        body('password').isLength({ max: 16 }).withMessage('password must be between 8 and 16 characters long and contain at least one uppercase letter and one lowercase letter'),
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('admin-login', { "error": errors[0], user: null });
    }
    next();
}


//Valiadate employee registration

export const validateEmployeeRegistration = async(req, res, next) => {
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('email').notEmpty().withMessage("Email is required"),
        body('email').isEmail().withMessage("Invalid email"),
        body('password').notEmpty().withMessage('Password is required'),
        body('password').isLength({ min: 8 }).withMessage('password must be between 8 and 16 characters long and contain at least one uppercase letter and one lowercase letter'),
        body('password').isLength({ max: 16 }).withMessage('password must be between 8 and 16 characters long and contain at least one uppercase letter and one lowercase letter'),
        body('jobTitle').notEmpty().withMessage("Job Title is required"),
        body('department').notEmpty().withMessage("Department is required"),
        body('location').notEmpty().withMessage("Location is required"),
        body('phone').notEmpty().withMessage("Phone is required"),
        body('phone').isLength({ min: 10 }).withMessage('phone number should contain 10 digit only'),
        body('phone').isLength({ max: 10 }).withMessage('phone number should contain 10 digit only'),
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('employee-register', { "error": errors[0], user: null });
    }
    next();
}



export const validateEmployeeFeedback = async(req, res, next) => {
    const rules = [
        body('employeeId').notEmpty().withMessage("Employee Id is required"),
        body('reviewerId').notEmpty().withMessage('Reviewer Id is required'),
        body('rating').notEmpty().withMessage('Rating is required'),
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
        body('feedback').notEmpty().withMessage('Feedback is required'),
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        const toEmployee = await UserModel.findOne({ _id: req.body.employeeId });
        const feedback = {
            fromEmployeeId: req.body.reviewerId,
            toEmployeeId: req.body.employeeId,
            toEmployeeName: toEmployee.name
        };
        return res.render('employee-pending-review', { "error": errors[0], feedback: feedback, user: req.cookies.user });
    }
    next();
}


export const validateAssignFeedback = async(req, res, next) => {
    const rules = [
        body('fromEmployeeId').notEmpty().withMessage("Reviewer Id is required"),
        body('toEmployeeId').notEmpty().withMessage('Employee Id is required'),
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);
    const employees = await UserModel.find({});
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('assign-feedback', { "error": errors[0], employees: employees, user: req.cookies.user });
    }
    const isReviewExist = await AssignReviewModel.findOne({ fromEmployeeId: req.body.fromEmployeeId, toEmployeeId: req.body.toEmployeeId, status: "Pending" });
    if (isReviewExist) {
        return res.render('assign-feedback', { error: { msg: "Already assigned" }, user: req.cookies.user, employees: employees });
    }
    console.log('review');
    next();
}
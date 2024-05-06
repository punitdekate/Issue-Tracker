import express from 'express';
import UserController from '../controller/user.controller.js';
import { validateAdminLogin, validateAssignFeedback, validateEmployeeLogin, validateEmployeeRegistration } from '../middleware/validation.middleware.js';
import { auth } from '../middleware/auth.middleware.js';

const userRouter = express.Router();
const userController = new UserController();

// userRouter.get("/", (req, res, next) => {
//     userController.renderAdminLogin(req, res, next);
// });

userRouter.get("/admin_login", (req, res, next) => {
    userController.renderAdminLogin(req, res, next);
});

userRouter.get("/employee_login", (req, res, next) => {
    userController.renderEmployeeLogin(req, res, next);
});

userRouter.get("/employee_register", (req, res, next) => {
    userController.renderEmployeeRegistration(req, res, next);
});

userRouter.get("/main_page", auth, (req, res, next) => {
    userController.renderMainPage(req, res, next);
});

userRouter.get("/error_404", (req, res, next) => {
    userController.render404(req, res, next);
});

userRouter.get('/main_page/assign_review', auth, (req, res, next) => {
    userController.renderAssignReview(req, res, next);
});

userRouter.post('/main_page/assign_review', auth, (req, res, next) => {
    userController.assignReview(req, res, next);
});

userRouter.get('/main_page/pending_reviews/add', auth, (req, res, next) => {
    userController.renderReviewForFeedback(req, res, next);
});

userRouter.get('/main_page/pending_reviews', auth, (req, res, next) => {
    userController.renderPendingReviews(req, res, next);
});

userRouter.get('/main_page/view_employee/update_role/:customId', auth, (req, res, next) => {
    userController.updateRole(req, res, next);
});

userRouter.get('/main_page/view_employee/update/:customId', auth, (req, res, next) => {
    userController.renderUpdateEmployee(req, res, next);
});

userRouter.post('/main_page/view_employee/update/:customId', auth, (req, res, next) => {
    userController.updateEmployee(req, res, next);
});

userRouter.get('/main_page/view_employee/:customId', auth, (req, res, next) => {
    userController.renderEmployeeView(req, res, next);
});

userRouter.delete('/main_page/view_employee/:_id', auth, (req, res, next) => {
    userController.deleteEmployee(req, res, next);
});

userRouter.get('/main_page/view_employee', auth, (req, res, next) => {
    userController.renderAllEmployees(req, res, next);
});




userRouter.post("/admin_login", validateAdminLogin, (req, res, next) => {
    userController.postAdminLogin(req, res, next);
});

userRouter.post("/employee_login", validateEmployeeLogin, (req, res, next) => {
    userController.postEmployeeLogin(req, res, next);
});

userRouter.post("/employee_register", validateEmployeeRegistration, (req, res, next) => {
    userController.postEmployeeRegistration(req, res, next);
});




export default userRouter;
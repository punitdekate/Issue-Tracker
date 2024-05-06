import PerformanceRepository from "../model/performance/performance.repository.js";
import UserRepository from "../model/performance/user/user.repository.js";
export default class PerformanceController {
    constructor() {
        this.performanceRepository = new PerformanceRepository();
        this.UserRepository = new UserRepository();
    }

    async renderFeedback(req, res, next) {
        try {
            const employees = await this.UserRepository.findAllUserBySpecifiedFactor({})
            return res.render('employee-feedback', { error: null, employees: employees, user: req.cookies.user });
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }

    async postFeedback(req, res, next) {
        try {
            const feedback = await this.performanceRepository.employeeFeedback(req.cookies.user.userId, req.body);
            await this.UserRepository.changeReviewStatusDone(req.body.reviewerId, req.body.employeeId);
            return res.redirect('/main_page');
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }

    async renderAllPerformance(req, res, next) {
        try {
            const performances = await this.performanceRepository.findAllPerformanceBySpecifiedFactor({});
            console.log(performances);
            return res.render('performance', { user: req.cookies.user, performances: performances })
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }

    async renderUpdatePerformance(req, res, next) {
        try {
            console.log(req.params._id);
            const performance = await this.performanceRepository.findPerformanceBySpecifiedFactor({ _id: req.params._id });
            console.log(performance);
            return res.render('performance-update', { error: null, performance: performance, user: req.cookies.user })
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }

    async updatePerformance(req, res, next) {
        try {
            const performance = await this.performanceRepository.updatePerformanceBySpecificFactor(req.params._id, req.body);

            return res.redirect('/main_page/view_performance')
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }

    async renderPerformanceView(req, res, next) {
        try {
            const performance = await this.performanceRepository.findPerformanceBySpecifiedFactor({ _id: req.params._id });
            return res.render('performance-view', { error: null, performance: performance, user: req.cookies.user })
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }

    async deletePerformance(req, res, next) {
        try {
            const performance = await this.performanceRepository.deletePerformanceBySpecificFactor({ _id: req.params._id });
            return res.redirect('/main_page/view_performance')
        } catch (error) {
            console.log(error);
            return res.redirect('/error_404');
        }
    }


}
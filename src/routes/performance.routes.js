import express from 'express';
import PerformanceController from '../controller/performance.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { validateEmployeeFeedback } from '../middleware/validation.middleware.js';
const performanceRouter = express.Router();

const performanceController = new PerformanceController()
performanceRouter.get('/add', (req, res, next) => {
    performanceController.renderFeedback(req, res, next);
});

performanceRouter.post('/add', validateEmployeeFeedback, (req, res, next) => {
    performanceController.postFeedback(req, res, next);
});

performanceRouter.get('/update/:_id', (req, res, next) => {
    performanceController.renderUpdatePerformance(req, res, next);
});

performanceRouter.post('/update/:_id', (req, res, next) => {
    performanceController.updatePerformance(req, res, next);
});

performanceRouter.get('/:_id', (req, res, next) => {
    performanceController.renderPerformanceView(req, res, next);
});

performanceRouter.delete('/:_id', (req, res, next) => {
    performanceController.deletePerformance(req, res, next);
});

performanceRouter.get('/', (req, res, next) => {
    performanceController.renderAllPerformance(req, res, next);
});
export default performanceRouter;
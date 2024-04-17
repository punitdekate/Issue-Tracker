import express from "express";
import { auth } from "../../../middlewares/auth.js";
import ProjectController from "../../controllers/project/project.controller.js";
import { validateProject } from "../../../middlewares/project.validator.middleware.js";
const projectRouter = express.Router();

const projectController = new ProjectController();
projectRouter.get("/new", auth, (req, res, next) => {
    projectController.showNewProject(req, res, next);
})

projectRouter.post("/new", auth, validateProject, (req, res, next) => {
    projectController.createNewProject(req, res, next);
});

projectRouter.get('/main-page', auth, (req, res, next) => {
    projectController.showMainPage(req, res, next);
})

projectRouter.get('/main-page/issue', auth, (req, res, next) => {
    projectController.showIssue(req, res, next);
})






export default projectRouter;
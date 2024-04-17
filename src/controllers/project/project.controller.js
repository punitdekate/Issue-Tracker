import ProjectRepository from "../../model/project/project.repository.js";

export default class ProjectController {
    constructor() {
        this.projectRepository = new ProjectRepository();
    }
    async showMainPage(req, res, next) {
        try {
            const userId = req.cookies.userId;
            const projects = await this.getProjectCreatedByUser(userId);
            return res.render('main-page', { projects: projects })
        } catch (error) {
            return res.render("error-404")
        }
    }
    showNewProject(req, res, next) {
        try {
            return res.render('create-project', { "error": null, userEmail: req.cookies.userEmail });
        } catch (error) {
            return res.render("error-404")
        }
    }

    showIssue(req, res, next) {
        try {
            return res.render('create-issue', { "error": null, userEmail: req.cookies.userEmail });
        } catch (error) {
            return res.render("error-404");
        }
    }

    async createNewProject(req, res, next) {
        try {
            const { name, description, type, duration } = req.body;
            const userId = req.cookies.userId;
            const project = await this.projectRepository.createProject(name, description, type, duration, userId);
            if (project) {
                return res.redirect('/main-page');
            } else {
                return res.render("error-404");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProjectCreatedByUser(userId) {
        try {
            const projects = await this.projectRepository.getUserCreatedProject({ createdBy: userId });
            return projects;
        } catch (error) {
            console.log(error);
        }
    }
}
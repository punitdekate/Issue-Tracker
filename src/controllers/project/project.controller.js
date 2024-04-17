import ProjectRepository from "../../model/project/project.repository";

export default class ProjectController {
    constructor() {
        this.projectRepository = new ProjectRepository();
    }
}
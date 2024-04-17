import ProjectModel from "./project.schema.js";
import ProjectTypeModel from "./projectType.schema.js";
export default class ProjectRepository {

    async createProject(name, description, type, duration, userId) {
        try {
            const project = new ProjectModel({
                name: name,
                description: description,
                type: type,
                duration: duration,
                createdBy: userId,
            });
            const projectCreated = await project.save();
            return projectCreated;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserCreatedProject(factor) {
        try {
            return await ProjectModel.find(factor);
        } catch (error) {
            console.log(error);
        }
    }
}
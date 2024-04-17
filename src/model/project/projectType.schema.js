import mongoose from "mongoose";

const projectTypeSchema = new mongoose.Schema({
    projectType: {
        type: String,
        required: [true, "Project type is required"],
        unique: [true, "Project type is already present"]
    }
});

const ProjectTypeModel = mongoose.model("ProjectType", projectTypeSchema);
export default ProjectTypeModel;
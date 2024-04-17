import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Project name is required"],
        unique: [true, "Project name should be unique"]
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ["software", "hardware"],
        required: [true, "Type is required"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: ["true", "UserId is required"]
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue'
    }],
    createdOnDate: {
        type: Date,
        default: Date.now()
    },
    duration: {
        type: Date,
    }
})

const ProjectModel = mongoose.model("Project", projectSchema);
export default ProjectModel;
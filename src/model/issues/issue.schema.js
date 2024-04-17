import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    projectName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    issueType: {
        type: String,
        required: [true, "Issue type is required"]
    },
    status: {
        type: String,
        required: [true, "Status is required"]
    },
    summary: {
        type: String,
        required: [true, "Summary is required"]
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String
    },
    severity: {
        type: String,
    },
    priority: {
        type: String,
    },
    attachments: [{
        type: String
    }],
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

const IssueModel = mongoose.model("Issue", issueSchema);
export default IssueModel;
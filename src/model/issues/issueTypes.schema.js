import mongoose from "mongoose";

const issueType = new mongoose.Schema({
    type: {
        type: String
    }
})

const issueTypeModel = mongoose.model('IssueType', issueType);
export default issueTypeModel;
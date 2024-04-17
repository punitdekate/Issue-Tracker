import mongoose from "mongoose";

const issuePriority = new mongoose.Schema({
    priority: {
        type: String
    }
})

const issuePriorityModel = mongoose.model('IssuePriority', issuePriority);
export default issuePriorityModel;
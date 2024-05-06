import mongoose from "mongoose";

const assignReviewSchema = new mongoose.Schema({
    fromEmployeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toEmployeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Done"],
        default: "Pending"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const AssignReviewModel = mongoose.model('AssignReview', assignReviewSchema);

export default AssignReviewModel;
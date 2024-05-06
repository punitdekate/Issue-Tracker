import mongoose from "mongoose";
import AssignReviewModel from "./user/assign-review.schema.js";
const performanceReviewSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    feedback: String
});

const PerformanceReviewModel = mongoose.model('PerformanceReview', performanceReviewSchema);

export default PerformanceReviewModel;
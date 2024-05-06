import PerformanceReviewModel from "./performance.schema.js";

export default class PerformanceRepository {

    async employeeFeedback(employeeId, data) {
        try {
            data.reviewerId = employeeId;
            const feedback = new PerformanceReviewModel(data);
            const employeeFeed = await feedback.save();
            return employeeFeed;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAllPerformanceBySpecifiedFactor(factor, select = false) {
        try {
            return await PerformanceReviewModel.find(factor).populate('employeeId').populate('reviewerId');
        } catch (error) {
            throw new Error(error);
        }
    }
    async findPerformanceBySpecifiedFactor(factor) {
        try {
            return await PerformanceReviewModel.findOne(factor).populate('employeeId').populate('reviewerId');
        } catch (error) {
            throw new Error(error);
        }
    }

    async deletePerformanceBySpecificFactor(factor) {
        try {
            return await PerformanceReviewModel.deleteOne(factor);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updatePerformanceBySpecificFactor(id, updateData) {
        try {
            return await PerformanceReviewModel.findOneAndUpdate({ _id: id }, updateData, { new: true })
        } catch (error) {
            throw new Error(error);
        }
    }

}
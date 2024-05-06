import mongoose from "mongoose";

const userIdSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    counter: {
        type: Number,
    }
});

const UserIdModel = mongoose.model("EmployeeCounter", userIdSchema);

async function createCounter() {
    const counter = await UserIdModel.findOne({ _id: "counter" });
    // console.log(counter);
    if (!counter) {
        const employeeCounter = new UserIdModel({ _id: "counter", counter: 0 });
        await employeeCounter.save();
    }
}
createCounter();

export async function getNextCounter() {
    const result = await UserIdModel.findOneAndUpdate({ _id: "counter" }, { $inc: { counter: 1 } }, { new: true });
    console.log(result);
    return "EMP-" + result.counter;
}

export { UserIdModel };
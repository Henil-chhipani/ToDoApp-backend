import mongoose, {model, Schema} from "mongoose";

const TaskSchema = new Schema(
    {
        taskTitle: {type: String, require: true},
        taskDescription: {type: String, require: true},
        isCompleted:{type: Boolean, require: true}
    },
    {timestamps: true}
)

export const task = model("Task", TaskSchema)
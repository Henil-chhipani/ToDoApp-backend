import { asyncHandler } from "../utils/AsyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { task } from "../models/task.model.js";
import { application } from "express";

const addingTask = asyncHandler(async (req, res) => {

    const {
        taskTitle,
        taskDescription,

    } = req.body;

    if ([taskTitle, taskDescription].some((field) => !field || field.trim() === "")) {
        throw new apiError(409, "Every field is required");
    }


    const isCompleted = false
    const Task = await task.create({
        taskTitle,
        taskDescription,
        isCompleted
    })

    const createdTask = await task.findById(Task._id)

    if (!createdTask) {
        throw new apiError(500, "something went wrong while creating task")
    }

    return res.status(201).json(new apiResponse(200, createdTask, " task added successfully"))

})



const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasksList = await task.find({});
        return res.status(200).json(new apiResponse(200, tasksList));
    } catch (error) {
        console.log("error", error);

        throw new apiError(400, "error in getting tasks")
    }
})

const getTaskByTitle = asyncHandler(async (req, res) => {
    try {

        const { taskTitle } = req.query
        if (!taskTitle || taskTitle.trim() === "") {
            throw new apiError(409, "task title is empty")
        }

        const taskData = await task.find({ taskTitle: taskTitle })

        return res.status(201).json(new apiResponse(200, taskData, "geting task by title"))


    } catch (error) {
        console.log("error", error);
        throw new apiError(400, "error in getting tasks")
    }
})


const updateTask = asyncHandler(async (req, res) => {
    try {

        const { _id, taskTitle, taskDescription } = req.body

        console.log(_id, taskTitle, taskDescription)

        if ([taskTitle, taskDescription].some((field) => !field || field.trim() == "") && !_id) {
            throw new apiError(409, "details in is not proper manner ")
        }

        const updateData = {
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            
        };

        const updatedTaskData = await task.findByIdAndUpdate(_id, updateData, { new: true })

        if (!updatedTaskData) {
            throw new apiError(500, "fail to update task")
        }
        return res.status(200).json(new apiResponse(200, updatedTaskData, "Task updated successfully"));

    } catch (error) {
        console.log("error", error)
        throw new apiError(400, "error in updateing tasks")
    }
})

const updateIsCompleted = asyncHandler(async (req, res) => {
    try {
        const { _id, isCompleted } = req.body;


        if (!_id) {
            throw new apiError(409, "Task id is required");
        }

        
        if (typeof isCompleted !== "boolean") {
            throw new apiError(409, "isCompleted must be a boolean");
        }

        
        const updatedTask = await task.findByIdAndUpdate(
            _id,
            { isCompleted: isCompleted },
            { new: true }
        );

        if (!updatedTask) {
            throw new apiError(404, "Task not found");
        }

        return res
            .status(200)
            .json(new apiResponse(200, updatedTask, "Task updated successfully"));
    } catch (error) {
        console.error("Error updating task:", error);
        throw new apiError(400, "Error updating task");
    }
});

const deleteById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params
        console.log(req.params);

        if (!_id) {
            throw apiError(409, "Give proper Id")
        }

        const deleteTask = await task.findByIdAndDelete(_id)

        if (!deleteTask) {
            throw apiError(404, "Task not found")
        }

        return res.status(200).json(new apiResponse(200, deleteTask, "Task deleted successfully"))

    } catch (error) {
        console.log("error", error)
        throw new apiError(400, "error in deleteing tasks")
    }
})

export { addingTask, getTasks, getTaskByTitle, updateTask, deleteById, updateIsCompleted }
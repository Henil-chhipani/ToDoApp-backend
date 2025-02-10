import { Router } from "express";
import{
    addingTask,
    getTasks,
    getTaskByTitle,
    updateTask,
    deleteById,
    updateIsCompleted
} from "../controllers/task.controller.js"

const router = Router()

router.route("/getTaskByTitle").get(getTaskByTitle)
router.route("/getTasks").get(getTasks);
router.route("/addingTask").post(addingTask)
router.route("/updateTask").put(updateTask)
router.route("/updateIsCompleted").put(updateIsCompleted)
router.route("/deleteTask/:_id").delete(deleteById)


export default router;
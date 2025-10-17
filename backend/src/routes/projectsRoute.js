import express from "express"

const router = express.Router()
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/projectController.js'
import { requireAuth } from "../middlewares/requireAuth.js"


router.get("/",getAllProjects)
router.get("/:id",getProjectById)

router.post("/",requireAuth,createProject)
router.put("/:id",requireAuth,updateProject)
router.delete("/:id",requireAuth,deleteProject)

export default router
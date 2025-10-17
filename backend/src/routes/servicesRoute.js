import express from 'express'
import { createService, deleteService, getAllServices, getServicesById, updateService } from '../controllers/serviceController.js'
import { requireAuth } from '../middlewares/requireAuth.js'

const router = express.Router()

router.get("/",getAllServices)
router.get("/:id",getServicesById)

router.post("/",requireAuth,createService)
router.put("/:id",requireAuth,updateService)
router.delete("/:id",requireAuth,deleteService)


export default router
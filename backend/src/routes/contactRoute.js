import express from "express"
import { createContact, getAllContacts,deleteContact } from "../controllers/contactController.js"
import { requireAuth } from "../middlewares/requireAuth.js"
import  {contactLimiter}  from "../middlewares/contactLimiter.js"

const router = express.Router()



router.get("/",requireAuth,getAllContacts)
router.post("/",contactLimiter, createContact)
router.delete("/:id",requireAuth, deleteContact)


export default router
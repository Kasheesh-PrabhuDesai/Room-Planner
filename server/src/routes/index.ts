import { Router } from "express"
import { addRoom, deleteRoom, getRooms, updateRoom } from "../controllers/room"


const router: Router = Router()

router.get("/rooms", getRooms)

router.post("/add-room", addRoom)

router.put("/edit-room/:id", updateRoom)

router.delete("/delete-room/:id", deleteRoom)

export default router
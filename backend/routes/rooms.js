import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create room
router.post("/:hotelid", verifyAdmin, createRoom);

//update room
router.put("/:id", verifyAdmin, updateRoom);

//delete room
router.delete("/:id", verifyAdmin, deleteRoom);

//get room
router.get("/:id", getRoom);

//get all
router.get("/", getRooms);


router.put("/availability/:id", updateRoomAvailability);

export default router;
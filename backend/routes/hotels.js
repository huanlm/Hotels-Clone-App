import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//create hotel
router.post("/", verifyAdmin, createHotel);

//update hotel
router.put("/:id", verifyAdmin, updateHotel);

//delete hotel
router.delete("/:id", verifyAdmin, deleteHotel);

//get hotel
router.get("/find/:id", getHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

//get all
router.get("/", getHotels);

export default router;
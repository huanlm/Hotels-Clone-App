import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Authenticated");
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Authenticated and can delete account");
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Authenticated as admin");
// })

//update user
router.put("/:id", verifyUser, updateUser);

//delete user
router.delete("/:id", verifyUser, deleteUser);

//get user
router.get("/:id", verifyUser, getUser);

//get all
router.get("/", verifyAdmin, getUsers);

export default router;
import express from "express";
import {
  getUser,
  login,
  signup,
  userUpdate,
} from "../controllers/userController";

const router = express.Router();

// get user route
router.get("/user/:id", getUser);

// login route
router.post("/login", login);

// signup route
router.post("/signup", signup);

// update route
router.patch("/user/:id", userUpdate);

export default router;

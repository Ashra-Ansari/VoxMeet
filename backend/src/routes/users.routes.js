import { Router } from "express";
import {
  addToHistory,
  getUserHistory,
  login,
  register,
  deleteHistory,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity").post(verifyToken, addToHistory);
router.route("/get_all_activity").get(verifyToken, getUserHistory);
router.route("/delete_activity/:id").delete(verifyToken, deleteHistory);

export default router;

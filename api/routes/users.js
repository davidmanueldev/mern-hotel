import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hola Usuario, estás autenticado");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hola Usuario, estás autenticado y puedes borrar tu cuenta");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hola Admin, estás autenticado y puedes borrar la cuenta de cualquier usuario");
// });

// UPDATE
router.put("/:id", verifyUser, updateUser);
// DELETE
router.delete("/:id",verifyUser, deleteUser);
// GET
router.get("/:id",verifyUser, getUser);
// GET ALL
router.get("/",verifyAdmin, getUsers);

export default router;

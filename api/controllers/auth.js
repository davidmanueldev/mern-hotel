import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.contrasena, salt);

    const newUser = new User({
      nombreDeUsuario: req.body.nombreDeUsuario,
      correoElectronico: req.body.correoElectronico,
      contrasena: hashedPassword,
    });

    await newUser.save();
    res.status(200).send("Usuario creado exitosamente");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      nombreDeUsuario: req.body.nombreDeUsuario,
    });
    if (!user) return next(createError(404, "Usuario no encontrado"));

    const validPassword = await bcrypt.compare(
      req.body.contrasena,
      user.contrasena
    );
    if (!validPassword)
      return next(
        createError(400, "Contrasena incorrecta (o usuario incorrecto)")
      );

    const token = jwt.sign(
      { id: user._id, esAdmin: user.esAdmin },
      process.env.JWT
    );

    const { contrasena, esAdmin, ...otrosDetalles } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otrosDetalles });
  } catch (err) {
    next(err);
  }
};

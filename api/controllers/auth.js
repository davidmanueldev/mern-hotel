import User from '../models/User.js';

export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      nombreDeUsuario: req.body.nombreDeUsuario,
      correoElectronico: req.body.correoElectronico,
      contrasena: req.body.contrasena,
    });

    await newUser.save();
    res.status(201).send("Usuario creado exitosamente");
  } catch (err) {
    next(err);    
  }
}
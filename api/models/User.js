import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nombreDeUsuario: {
      type: String,
      required: true,
      unique: true,
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
    esAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Usuario", UsuarioSchema, "usuarios");
